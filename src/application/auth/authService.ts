export async function loginRequest(email: string, password: string): Promise<string> {
  const baseUrl = import.meta.env.VITE_AUTH_URL
  if (!baseUrl) throw new Error('VITE_AUTH_URL is not defined')

  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (response.status === 401) {
    throw new Error('Identifiants incorrects')
  }

  if (!response.ok) {
    throw new Error('Erreur serveur, veuillez réessayer')
  }

  const data = await response.json()
  return data.token as string
}
