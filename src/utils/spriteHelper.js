/**
 * Utility to proxy PokeAPI sprite URLs through jsDelivr CDN.
 * This resolves broken image issues caused by ISPs (such as Jio/Airtel in India) blocking raw.githubusercontent.com.
 * 
 * @param {string} url - The original sprite URL
 * @returns {string} The CDN-proxied URL
 */
export const getSpriteUrl = (url) => {
  if (!url) return '';
  return url.replace(
    'https://raw.githubusercontent.com/PokeAPI/sprites/master',
    'https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master'
  );
};
