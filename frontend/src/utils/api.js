const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

export async function apiFetch(url, options = {}) {
  let access = localStorage.getItem("access")
  
  // Set up headers
  options.headers = options.headers || {}
  if (access) {
    options.headers["Authorization"] = `Bearer ${access}`
  }

  try {
    let response = await fetch(url, options)

    // If unauthorized, token might have expired
    if (response.status === 401) {
      const refresh = localStorage.getItem("refresh")
      if (!refresh) {
        // No refresh token available, redirect to login
        logoutAndRedirect()
        return response
      }

      // Try to get a new access token
      try {
        const refreshResponse = await fetch(`${API_BASE_URL}/token/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh }),
        })

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json()
          localStorage.setItem("access", refreshData.access)
          
          // Retry the request with the new access token
          options.headers["Authorization"] = `Bearer ${refreshData.access}`
          response = await fetch(url, options)
        } else {
          // Refresh token is invalid/expired
          logoutAndRedirect()
        }
      } catch (refreshErr) {
        console.error("Token refresh failed:", refreshErr)
        logoutAndRedirect()
      }
    }

    return response
  } catch (err) {
    console.error("API call failed:", err)
    throw err
  }
}

function logoutAndRedirect() {
  localStorage.removeItem("access")
  localStorage.removeItem("refresh")
  localStorage.removeItem("username")
  window.location.href = "/login"
}
