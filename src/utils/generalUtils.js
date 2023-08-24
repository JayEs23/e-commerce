
export function encodeSpecialCharacters(text) {
  return text.replace(/[^\w\s]/gi, function(match) {
    return `&#${match.charCodeAt(0)};`;
  });
}

export function decodeSpecialCharacters(encodedText) {
  const doc = new DOMParser().parseFromString(encodedText, "text/html");
  return doc.documentElement.textContent;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    day: 'numeric',
    month: 'long',
    year: 'numeric'

  };
  
  return date.toLocaleString('en-US', options);
}

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
