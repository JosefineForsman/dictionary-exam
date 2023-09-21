export async function fetchDictionary(inputSearch) {
    if (!inputSearch) {
      return null;
    }
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputSearch}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }