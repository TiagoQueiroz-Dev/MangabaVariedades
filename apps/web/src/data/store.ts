export const storeInfo = {
  name: 'Mangaba Variedades',
  address: '',
  phone: '',
  instagramUrl: '',
  businessHours: 'Informe os dias e horários de atendimento.',
}

export function getStoreAddress() {
  return (import.meta.env.VITE_STORE_ADDRESS as string | undefined) || storeInfo.address
}

export function getStorePhone() {
  return (import.meta.env.VITE_STORE_PHONE as string | undefined) || storeInfo.phone
}

export function getStoreInstagramUrl() {
  return (import.meta.env.VITE_STORE_INSTAGRAM_URL as string | undefined) || storeInfo.instagramUrl
}
