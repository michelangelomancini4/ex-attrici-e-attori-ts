type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string

}
type ActressNationality = | "American" | "British" | "Australian" | "Israeli-American" | "South African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese"

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: ActressNationality
}


const url = `http://localhost:3333/actresses/`;


function isActress(dati: unknown): dati is Actress {

  return (
    typeof dati === 'object' && !dati == null &&
    "id" in dati && typeof dati.id === 'number' &&
    "name" in dati && typeof dati.name === 'string' &&
    "birth_year" in dati && typeof dati.birth_year === 'number' &&
    "death_year" in dati && typeof dati.death_year === 'number' &&
    "biography" in dati && typeof dati.biography === 'string' &&
    "image" in dati && typeof dati.image === 'string' &&
    "most_famous_movies" in dati && dati.most_famous_movies instanceof Array && dati.most_famous_movies.length === 3 && dati.most_famous_movies.every(m => typeof m === 'string') &&
    "awards" in dati && typeof dati.awards === 'string' &&
    "nationality" in dati && typeof dati.nationality === 'string'
  )
}

// function milestone 3

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`${url}${id}`)
    const dati: unknown = await response.json()
    if (!isActress(dati)) {
      throw new Error("Formato dei dati non valido");

    }
    return dati;

  } catch (error) {
    if (error instanceof Error) {
      console.error('Errore durante recupero dati attrice', error)
    } else {
      console.error('Errore sconosciuto', error);

    }
    return null;
  }
}

// function milestone 4

async function getAllActresses(): Promise<Actress[]> {
  try {
    const response = await fetch(url)
    const datiAllActresses: unknown = await response.json()
    if (!(datiAllActresses instanceof Array)) {
      throw new Error("Formato dei dati non valido");
    }
    const validActresses: Actress[] = datiAllActresses.filter(isActress);

    return validActresses;

  } catch (error) {
    if (error instanceof Error) {
      console.error('Errore durante recupero dati attrice', error)
    } else {
      console.error('Errore sconosciuto', error);

    }
    return [];
  }
}

