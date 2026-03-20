interface D1ResultMeta {
    last_row_id?: number | string
}

interface D1AllResult<T> {
    results: T[]
}

interface D1RunResult {
    meta: D1ResultMeta
}

interface D1PreparedStatement {
    bind(...values: Array<string | number | null>): D1PreparedStatement
    first<T = Record<string, unknown>>(): Promise<T | null>
    all<T = Record<string, unknown>>(): Promise<D1AllResult<T>>
    run(): Promise<D1RunResult>
}

interface D1Database {
    prepare(query: string): D1PreparedStatement
}

interface Env {
    DB: D1Database
    ALLOWED_ORIGINS?: string
    RESEND_API_KEY?: string
    RESEND_FROM_EMAIL?: string
    RESEND_FROM_NAME?: string
}

interface ReservationPayload {
    name: string
    email: string
    phone?: string
    service: string
    date: string
    time: string
    note?: string
}

interface ErrorPayload {
    error: string
}

interface SuccessPayload {
    reservationId: number
    message: string
    emailSent: boolean
    emailError?: string
}

interface ReservedSlotsPayload {
    date: string
    reservedTimes: string[]
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const TIME_RE = /^\d{2}:\d{2}$/
const PHONE_RE = /^[+]?([0-9\s()-]{6,20})$/
const RESEND_API_URL = 'https://api.resend.com/emails'

function corsHeaders(request: Request, env: Env): Record<string, string> {
    const origin = request.headers.get('Origin')
    const allowedOrigins = (env.ALLOWED_ORIGINS ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)

    let allowOrigin = '*'

    if (origin) {
        if (allowedOrigins.length === 0 || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
            allowOrigin = origin
        } else {
            allowOrigin = 'null'
        }
    }

    return {
        'Access-Control-Allow-Origin': allowOrigin,
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Vary': 'Origin',
    }
}

function json(
    request: Request,
    env: Env,
    body: ErrorPayload | SuccessPayload | ReservedSlotsPayload | Record<string, unknown>,
    status = 200,
): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            ...corsHeaders(request, env),
        },
    })
}

function normalizeOptional(value: unknown): string {
    if (typeof value !== 'string') {
        return ''
    }

    return value.trim()
}

function normalizeRequired(value: unknown): string | null {
    const normalized = normalizeOptional(value)
    return normalized.length > 0 ? normalized : null
}

function validatePayload(payload: unknown): { ok: true; value: ReservationPayload } | { ok: false; error: string } {
    if (!payload || typeof payload !== 'object') {
        return { ok: false, error: 'Neplatna data rezervace.' }
    }

    const input = payload as Record<string, unknown>

    const name = normalizeRequired(input.name)
    const email = normalizeRequired(input.email)
    const service = normalizeRequired(input.service)
    const date = normalizeRequired(input.date)
    const time = normalizeRequired(input.time)
    const phone = normalizeOptional(input.phone)
    const note = normalizeOptional(input.note)

    if (!name || !email || !service || !date || !time) {
        return { ok: false, error: 'Vyplnte povinna pole: jmeno, e-mail, sluzba, datum a cas.' }
    }

    if (name.length > 120) {
        return { ok: false, error: 'Jmeno je prilis dlouhe.' }
    }

    if (!EMAIL_RE.test(email) || email.length > 254) {
        return { ok: false, error: 'E-mail nema platny format.' }
    }

    if (service.length > 100) {
        return { ok: false, error: 'Nazev sluzby je prilis dlouhy.' }
    }

    if (!DATE_RE.test(date)) {
        return { ok: false, error: 'Datum nema platny format (YYYY-MM-DD).' }
    }

    if (!TIME_RE.test(time)) {
        return { ok: false, error: 'Cas nema platny format (HH:MM).' }
    }

    if (phone.length > 0 && !PHONE_RE.test(phone)) {
        return { ok: false, error: 'Telefon ma neplatny format.' }
    }

    if (note.length > 1000) {
        return { ok: false, error: 'Poznamka je prilis dlouha.' }
    }

    return {
        ok: true,
        value: {
            name,
            email,
            service,
            date,
            time,
            phone: phone || undefined,
            note: note || undefined,
        },
    }
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

function buildEmailHtml(payload: ReservationPayload): string {
    const name = escapeHtml(payload.name)
    const service = escapeHtml(payload.service)
    const date = escapeHtml(payload.date)
    const time = escapeHtml(payload.time)
    const phone = payload.phone ? escapeHtml(payload.phone) : '-'
    const note = payload.note ? escapeHtml(payload.note) : '-'

    return `<!doctype html>
<html>
    <body style="margin:0; padding:0; background:#060608; font-family:Arial, sans-serif; color:#f5f5f7;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center" style="padding:32px 16px;">
                    <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="background:#0e0e12; border-radius:16px; padding:32px;">
                        <tr>
                            <td style="font-size:22px; font-weight:700; padding-bottom:8px;">Potvrzeni rezervace - Dantier</td>
                        </tr>
                        <tr>
                            <td style="font-size:14px; color:#a1a1aa; padding-bottom:24px;">Dekuji, ${name}. Rezervace byla prijata.</td>
                        </tr>
                        <tr>
                            <td style="font-size:16px; font-weight:600; padding-bottom:12px;">Detail rezervace</td>
                        </tr>
                        <tr>
                            <td style="font-size:14px; line-height:1.6;">
                                <div><strong>Sluzba:</strong> ${service}</div>
                                <div><strong>Datum:</strong> ${date}</div>
                                <div><strong>Cas:</strong> ${time}</div>
                                <div><strong>Telefon:</strong> ${phone}</div>
                                <div><strong>Poznamka:</strong> ${note}</div>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size:12px; color:#71717a; padding-top:24px;">Pokud potrebujete upravit termin, odpovezte na tento e-mail.</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>`
}

async function sendConfirmationEmail(env: Env, payload: ReservationPayload): Promise<{ ok: boolean; error?: string }> {
    if (!env.RESEND_API_KEY) {
        return { ok: false, error: 'Email service neni nakonfigurovan.' }
    }

    const fromEmail = env.RESEND_FROM_EMAIL?.trim() || 'onboarding@resend.dev'
    const fromName = env.RESEND_FROM_NAME ? `${env.RESEND_FROM_NAME} ` : ''
    const from = fromName ? `${fromName}<${fromEmail}>` : fromEmail
    const html = buildEmailHtml(payload)

    const response = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from,
            to: payload.email,
            subject: 'Potvrzeni rezervace Dantier',
            html,
        }),
    })

    if (!response.ok) {
        const details = await response.text()
        const message = details.trim()
            ? `Nepodarilo se odeslat potvrzovaci email. ${details.trim()}`
            : 'Nepodarilo se odeslat potvrzovaci email.'
        return { ok: false, error: message }
    }

    return { ok: true }
}

async function handleReservedSlots(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const date = url.searchParams.get('date')

    if (!date || !DATE_RE.test(date)) {
        return json(request, env, { error: 'Datum nema platny format (YYYY-MM-DD).' }, 400)
    }

    try {
        const { results } = await env.DB.prepare(
            `SELECT reservation_time FROM reservations WHERE reservation_date = ?1 ORDER BY reservation_time ASC`
        )
            .bind(date)
            .all<{ reservation_time: string }>()

        return json(request, env, {
            date,
            reservedTimes: results.map((row) => row.reservation_time),
        })
    } catch {
        return json(request, env, { error: 'Nepodarilo se nacist rezervace.' }, 500)
    }
}

async function handleCreateReservation(request: Request, env: Env): Promise<Response> {
    let payload: unknown

    try {
        payload = await request.json()
    } catch {
        return json(request, env, { error: 'Request body musi byt validni JSON.' }, 400)
    }

    const validated = validatePayload(payload)

    if (!validated.ok) {
        return json(request, env, { error: validated.error }, 400)
    }

    const { name, email, phone, service, date, time, note } = validated.value

    try {
        const slotTaken = await env.DB.prepare(
            `SELECT id FROM reservations WHERE reservation_date = ?1 AND reservation_time = ?2 LIMIT 1`
        )
            .bind(date, time)
            .first<{ id: number }>()

        if (slotTaken) {
            return json(request, env, { error: 'Tento termin je jiz rezervovany. Vyberte prosim jiny cas.' }, 409)
        }

        const result = await env.DB.prepare(
            `INSERT INTO reservations (name, email, phone, service, reservation_date, reservation_time, note)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
        )
            .bind(name, email, phone ?? null, service, date, time, note ?? null)
            .run()

        const reservationId = Number(result.meta.last_row_id ?? 0)
        const emailResult = await sendConfirmationEmail(env, { name, email, phone, service, date, time, note })

        const message = emailResult.ok
            ? 'Rezervace byla ulozena. Brzy se vam ozveme s potvrzenim.'
            : 'Rezervace byla ulozena, ale potvrzovaci email se nepodarilo odeslat.'

        return json(request, env, {
            reservationId,
            message,
            emailSent: emailResult.ok,
            emailError: emailResult.ok ? undefined : emailResult.error,
        }, 201)
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Neznama chyba databaze.'

        if (errorMessage.includes('UNIQUE constraint failed')) {
            return json(request, env, { error: 'Tento termin je jiz rezervovany. Vyberte prosim jiny cas.' }, 409)
        }

        return json(request, env, { error: 'Nepodarilo se ulozit rezervaci. Zkuste to prosim znovu.' }, 500)
    }
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url)

        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: corsHeaders(request, env),
            })
        }

        if (url.pathname === '/api/health' && request.method === 'GET') {
            return json(request, env, { ok: true, service: 'reservations-api' })
        }

        if (url.pathname === '/api/reservations' && request.method === 'GET') {
            return handleReservedSlots(request, env)
        }

        if (url.pathname === '/api/reservations' && request.method === 'POST') {
            return handleCreateReservation(request, env)
        }

        return json(request, env, { error: 'Endpoint nebyl nalezen.' }, 404)
    },
}
