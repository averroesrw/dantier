interface D1ResultMeta {
    last_row_id?: number | string
}

interface D1RunResult {
    meta: D1ResultMeta
}

interface D1PreparedStatement {
    bind(...values: Array<string | number | null>): D1PreparedStatement
    first<T = Record<string, unknown>>(): Promise<T | null>
    run(): Promise<D1RunResult>
}

interface D1Database {
    prepare(query: string): D1PreparedStatement
}

interface Env {
    DB: D1Database
    ALLOWED_ORIGINS?: string
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
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const TIME_RE = /^\d{2}:\d{2}$/

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
    body: ErrorPayload | SuccessPayload | Record<string, unknown>,
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

    if (phone.length > 32) {
        return { ok: false, error: 'Telefon je prilis dlouhy.' }
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

        return json(request, env, {
            reservationId,
            message: 'Rezervace byla ulozena. Brzy se vam ozveme s potvrzenim.',
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

        if (url.pathname === '/api/reservations' && request.method === 'POST') {
            return handleCreateReservation(request, env)
        }

        return json(request, env, { error: 'Endpoint nebyl nalezen.' }, 404)
    },
}
