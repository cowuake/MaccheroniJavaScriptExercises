import booleanIntersects from '@turf/boolean-intersects'

// Clonare l'oggetto
export function cloneObject(object) {
  // return { ...object } // Too easy :) And dangerous! D:
  // return JSON.parse(JSON.stringify(object)) // Still too easy :)
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (typeof value === 'object') {
      return { ...acc, key: cloneObject(value) }
    } else {
      acc[key] = value
      return acc
    }
  }, {})
}

// Unire i due oggetti in un unico, senza modificare gli oggetti originali
export function mergeObjects(object1, object2) {
  return { ...object1, ...object2 }
}

// Dato un oggetto e un array con chiave-valore, aggiungere chiave-valore all'oggetto
// senza modificare l'originale, ma restituendo una copia
export function setPropery(object, [key, value]) {
  Object.keys(object).map((objectKey) => {
    if (objectKey === key) {
      return value
    } else {
      return object[objectKey]
    }
  })
}

// Convertire un oggetto contentene altri oggetti in array
// La chiave di ciascun oggetto va inserita nell'oggetto stesso come `key`
// Es.: { a: { name: 'X' }, b: { name: 'Y' } } diventa [{ key: 'a', name: 'X' }, b: { key: 'b', name: 'Y' }]
export function toArray(object) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    value['key'] = key
    acc.push(value)
    return acc
  }, [])
}

// Dato un oggetto, restituire un nuovo oggetto mantenendo
// soltanto le chiavi i cui valori soddisfano la funzione `predicate` (a cui bisogna passare sia la chiave, sia il valore)
// Es.: { name: 'Kate', number1: 100, number2: 40, number3: 77 } con predicate = (key, value) => key === 'name' || value > 50
// restituisce  { name: 'Kate', number1: 100, number3: 77 }
export function filterObject(object, predicate) {
  return Object.entries(object)
    .filter(([key, value]) => {
      return predicate(key, value)
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
}

// Data una chiave `key`, una funzione `getValue` per ottenere il valore associato a quella chiave e un oggetto `cache`,
// `getCachedValue` deve chiamare una sola volta `getValue` e conservare il valore ottenuto, in modo che se
// la funzione viene richiamata successivamente con la stessa chiave, venga restituito il valore senza richiamare `getValue`
export function getCachedValue(key, getValue, cache) {
  return key in cache ? cache[key] : (cache[key] = getValue())
}

// Dato un array bidimensionale, dove ogni array interno è una coppia chiave-valore, convertirlo in un oggetto
// Es.: [['name', 'John'], ['age', 22]] diventa { name: 'John', age: 22 }
export function arrayToObject(array) {
  return array.reduce(
    (acc, [key, value]) =>
      // acc[key] = value
      // return acc
      ({
        ...acc,
        [key]: value // FUNNY!
      }),
    {}
  )
}

// Come `arrayToObject`, ma tutti i valori di tipo array devono a loro volta essere trasformati in oggetti
// Controllare il test per vedere dato iniziale e risultato finale
export function arrayToObjectDeep(array) {
  return array.reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? arrayToObjectDeep(value) : value
    return acc
  }, {})
}

// Dato un oggetto e una funzione `predicate` da chiamare con la coppia chiave-valore,
// restituire true se almeno una delle proprietà dell'oggetto soddisfa la funzione `predicate`.
// Es.: { name: 'Mary', age: 99, children: 4 } con predicate = (key, value) => value > 10
// ritorna true perché è presente una proprietà maggiore di 10 (age)
export function hasValidProperty(object, predicate) {
  return Object.entries(object).some(([key, value]) => predicate(key, value))
}

// Dato un oggetto, estrarre tutti i valori che sono a loro volta oggetti in un oggetto separato, usando come chiave il loro id;
// rimuovere la chiave nell'oggetto di partenza e sostituirla con `{nome_chiave}Id` e usare come valore l'id dell'oggetto estratto.
// Es.: { id: 1, name: 'John', car: { id: 33, manufacturer: 'Ford' } } restituisce due oggetti:
// { id: 1, name: 'John', carId: 33 } e l'altro { 33: { id: 33, manufacturer: 'Ford' } }
// Ritornare un array con i due oggetti (vedere il test per altri esempi)
// Idealmente dovrebbe funzionare per ogni oggetto trovato dentro l'oggetto di partenza, anche quelli annidati
export function normalizeObject(object) {}

// Dato un tree del tipo
// 1.       A
//        / | \
// 2.    B  C  D
//      / \
// 3.  E   F
// restituire la profondità (in questo caso 3)
// Il tree ha la seguente struttura: { value: 'A', children: [{ value: 'B', children: [...] }, { value: 'C' }] }
export function getTreeDepth(tree) {
  // Can be done in one line!
  if (!tree) {
    return 0
  } else if (!tree.children || tree.children.length == 0) {
    return 1
  }
  return (
    1 +
    tree.children
      .map((node) => getTreeDepth(node))
      .reduce((acc, depth) => {
        if (depth > acc) {
          acc = depth
        }
        return acc
      }, 1)
  )
}

// Dato un tree come sopra, contare il numero di nodi "leaf", cioè quelli senza ulteriori figli (0 children)
// Considerando l'esempio sopra, i nodi "leaf" sono 4 (C, D, E, F)
export function countTreeLeafNodes(tree) {
  // Can be done in one line!
  if (!tree) {
    return 0
  } else if (!tree.children || tree.children.length == 0) {
    return 1
  }
  return tree.children
    .map((node) => countTreeLeafNodes(node))
    .reduce((acc, nLeafs) => {
      acc += nLeafs
      return acc
    }, 0)
}

// Dati un oggetto e un path di tipo stringa, `get` deve restituire la proprietà al path specificato.
// Se path contiene punti, si tratta di proprietà annidate. `get` deve funzionare anche con gli array,
// specificando un numero come indice. Se la proprietà non esiste ritornare fallback o undefined.
// Es. 1: { address: { city: 'New York' } } e 'address.city' ritorna 'New York'
// Es. 2: { movies: ['Shrek', 'Shrek 2'] } e 'movies.1' ritorna 'Shrek 2'
export function get(object, path, fallback) {
  const [key, route] = path.split('.')
  return object[key][route] ?? fallback
}

// Dato un oggetto con una struttura non uniforme contentente informazioni geografiche
// su strade e punti di interesse, generare un oggetto GeoJSON (RFC 7946) valido.
// NOTA: per avere un'idea dell'input vedere il test corrispondente,
// per il GeoJSON finale da generare vedere il file `mock.js`.
export function createGeoJSON(data) {}

// Dati un array contentente le coordinate [lng, lat] di alcune geometrie (linee e punti),
// e un punto con coordinate [lng, lat], stabilire se il punto interseca una o più geometrie del primo array.
// Se sì, convertire l'array in un oggetto GeoJSON valido, dove la/le feature intersecate
// hanno `highlighted: true` all'interno dell'oggetto `properties`. Se il punto non interseca nulla, ritornare null.
// Per vedere i dati in input e il risultato finale, fare riferimento ai test.
// NOTA: usare booleanIntersects (https://turfjs.org/docs/#booleanIntersects) per controllare se una geometria ne interseca un'altra.
export function highlightActiveFeatures(geoJSON, point) {}

// Data una stringa in formato VTT contentente una lista di sottotitoli associati a un istante temporale (inizio --> fine), es.:
//
// WEBVTT
//
// 00:01.000 --> 00:04.000
// Never drink liquid nitrogen.
//
// 00:05.000 --> 00:09.000
// It will perforate your stomach. ou could die.
//
// restituire la riga corretta in base a `time`.
// Ad esempio, quando time è '00:07.988' la funzione deve restituire 'It will perforate your stomach. You could die.'
// Restituire null se non ci sono sottotitoli per il time specificato. Tornando all'esempio di sopra, '00:37.430' restituisce null.
export function getLineFromVTT(vtt, time) {}
