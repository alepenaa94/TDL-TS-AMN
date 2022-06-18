export default function request<TResponse>(
  url: string, 
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      alert("Parece que hubo un error: "+error);
    })
}