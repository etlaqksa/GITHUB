export const COMPANY = {
  nameAr: 'شركة إطلاق المتميزة المحدودة',
  nameEn: 'Etlaq Distinguished Company',
  brand: 'ETLAQ',
  domain: 'etlaqksa.com',
  // No spaces to prevent line-breaks on small screens.
  phoneDisplay: '+966534145922',
  phoneE164: '+966534145922',
  email: 'info@etlaqksa.com',
  addressAr: 'الرياض - حي الياسمين (طريق أنس بن مالك)',
  addressEn: 'Riyadh - Al Yasmin (Anas Bin Malik Rd)',
  // Keep as a Google Maps query link (no claim of exact coordinates)
  mapsUrl: 'https://maps.google.com/?q=4348+Anas+Bin+Malik+Road,+Al+Yasmin,+Riyadh,+Saudi+Arabia',
  // Official registration numbers
  commercialRegister: '1010823069',
  vatNumber: '311394818900003',
};

export function buildLocalBusinessSchema(params: { url: string; logoUrl: string; imageUrl?: string }) {
  return {
    '@type': 'LocalBusiness',
    name: `${COMPANY.nameAr} (${COMPANY.brand})`,
    url: params.url,
    logo: params.logoUrl,
    image: params.imageUrl ? [params.imageUrl] : undefined,
    telephone: COMPANY.phoneE164,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SA',
      addressLocality: 'Riyadh',
      streetAddress: 'Anas Bin Malik Rd, Al Yasmin',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: COMPANY.phoneE164,
        contactType: 'customer service',
        areaServed: 'SA',
        availableLanguage: ['ar', 'en'],
      },
    ],
  };
}
