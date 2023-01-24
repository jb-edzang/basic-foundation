const getApiError = (err) =>
  err?.response?.data?.error || "Oops. Something went wrong"

export default getApiError
