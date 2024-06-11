// Duplicare l'array
export function cloneArray(array) {
  return [...array]
}

// Inserire l'elemento alla fine
export function addToArrayEnd(array, newElement) {
  return [...array, newElement]
}

// Inserire l'elemento all'inizio
export function addToArrayBeginning(array, newElement) {
  return [newElement, ...array]
}

// Inserire l'elemento all'indice specificato
// Se l'indice è negativo, inserirlo all'inizio dell'array
// Se l'indice è superiore alla lunghezza dell'array, inserirlo alla fine
export function insertIntoArray(array, newElement, index) {
  if (index < 0) {
    return [newElement, ...array]
  } else if (index >= array.length) {
    return [...array, newElement]
  }
  return [...array.slice(0, index), newElement, ...array.slice(index)]
}

// Dato un array di oggetti, trovare l'elemento in base a `condition`
// `condition` è un oggetto tipo { id: 46 } o { name: 'Anna' }
// Nel primo caso `findBy` deve restituire il primo elemento che ha un id uguale a 46;
// nel secondo caso il primo elemento che ha name uguale ad Anna
// Restituire null se non viene trovato nulla
export function findBy(array, condition) {
  for (const item of array) {
    const [key] = Object.keys(condition)
    if (item[key] === condition[key]) {
      return item
    }
  }
  return null
}

// Come `findBy`, ma ritorna tutti gli elementi per i quali `condition` risulta vera
// Se per nessun elemento risulta vera, ritornare un array vuoto
export function filterBy(array, condition) {
  // NOTE: Array good stuff can be used
  let result = []
  for (const item of array) {
    const [key] = Object.keys(condition)
    if (item[key] === condition[key]) {
      result.push(item)
    }
  }
  return result
}

// Dato un array e un elemento, se l'elemento non è presente nell'array va inserito alla fine
// Se l'elemento è già presente, va rimosso
export function toggleArrayItem(array, element) {
  if (array.includes(element)) {
    return array.filter((item) => item !== element)
  }
  return [...array, element]
}

// Rimuove dall'array l'elemento all'indice specificato
// Se l'indice è superiore o inferiore alla lunghezza dell'array, ritornare l'array originale
export function removeFromArray(array, index) {
  if (index < 0 || index >= array.length) {
    return array
  }
  return [...array.slice(0, index), ...array.slice(index + 1)]
}

// Dati 2 o più array, unirli in un unico array
export function mergeArrays(...arrays) {
  return arrays.flat()
}

// Dati 2 o più array, unirli in un unico array, ma rimuovere eventuali duplicati
export function mergeArraysUnique(...arrays) {
  return [...new Set(arrays.flat())]
}

// Dato un array di oggetti, una chiave e una direzione (ASC | DESC), ordinare l'array in base ai valori della chiave specificata
// Se `direction` è ASC l'ordine deve essere ascendente, se è DESC discendente
// Es.: [{ age: 44, name: 'Mary' }, { age: 22, name: 'John' }, { age: 31, name: 'Mark' }] con chiave age e direction DESC
// restituisce [{ age: 44, name: 'Mary' }, { age: 31, name: 'Mark' }, { age: 22, name: 'John' }]
// Nota: `key` farà sempre riferimento a valori numerici
export function sortBy(array, key, direction) {
  if (direction === 'ASC') {
    return array.sort((a, b) => a[key] - b[key])
  }

  return array.sort((a, b) => b[key] - a[key])
}

// Dato un array di oggetti, convertirlo in oggetto e usare come chiave il valore di `key`
// Es.: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }] con key = 'name' deve restituire
// { A: { id: 1, name: 'A' }, B: { id: 2, name: 'B' } }
export function keyBy(array, key) {
  return array.reduce((acc, item) => ({ ...acc, [item[key]]: item }), {})
}

// Dato un array, inserire il nuovo elemento all'indice specificato, sostituendo quello che c'è già
export function replaceItemAtIndex(array, newItem, index) {
  return [...array.slice(0, index), newItem, ...array.slice(index + 1)]
}

// Dato un array di oggetti, aggiungere a ogni oggetto le proprietà specificate
// Es.: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }] con properties { city: 'X', number: 99 }
// deve restituire [{ id: 1, name: 'A', city: 'X', number: 99  }, { id: 2, name: 'B', city: 'X', number: 99 }]
// L'array originale e i suoi elementi non devono essere modificati
export function addExtraProperties(array, properties) {
  return array.map((item) => ({ ...item, ...properties }))
}

// Dato un array di oggetti rimuovere da ciascuno di essi le proprietà specificate
// Es.: [{ id: 1, name: 'A', city: 'X', state: 'Y' }] con properties ['city', 'state']
// deve restituire [{ id: 1, name: 'A' }]
// L'array originale e i suoi elementi non devono essere modificati
export function removeProperties(array, properties) {
  return array.map((item) =>
    Object.fromEntries(
      Object.entries(item).filter(([key, _]) => !properties.includes(key))
    )
  )
}

// Dato un array di oggetti con una chiave id e un array di id selezionati,
// ritornare un nuovo array in cui gli elementi selezionati hanno la proprietà `selected`= true
// Es.: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }] e selectedIds = [2, 3]
// deve restituire [{ id: 1, name: 'A' }, { id: 2, name: 'B', selected: true }, { id: 3, name: 'C', selected: true }]
// L'array originale e i suoi elementi non devono essere modificati
export function setSelected(array, selectedIds) {
  return array.map((item) =>
    selectedIds.some((id) => item.id === id)
      ? { ...item, selected: true }
      : item
  )
}

// Dato un array di oggetti, rimapparlo estraendo la chiave specificata
// Es.: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'B' }] con chiave 'name'
// deve restituire ['A', 'B', 'C']
// Se la chiave non esiste, ritornare l'elemento originale
export function mapTo(array, key) {
  // Original element... By reference! LOL
  return array.map((item) => item[key] ?? item)
}

// Dato un array di oggetti e una funzione `predicate`, eseguire la funzione per ogni elemento
// e ritornare true se per TUTTI è valida, altrimenti ritornare false
// Es.: [{ id: 1, age: 32 }, { id: 2, age: 29 }] con predicate = (item) => item.age > 30,
// `areItemsValid` ritorna false perché non tutti gli elementi hanno `age` maggiore di 30
export function areItemsValid(array, predicate) {
  return array.every(predicate)
}

// Dato un array di stringhe, un array di oggetti e una chiave, ritornare un nuovo array
// dove ogni elemento del primo è sostuito col corrispondente elemento del secondo in base al valore di `key`
// Es. array = ['11', '22', '33'], dataArray = [{ id: '33', name: 'A' }, { id: '11', name: 'B' }, { id: '22', name: 'C' }], key = 'id'
// `populate` reve restituire [{ id: '11', name: 'B' }, { id: '22', name: 'C' }, { id: '33', name: 'A' }]
// perché '11' nel primo array corrisponde con l'oggetto che ha id = '11' nel secondo array e così via
export function populate(array, dataArray, key) {
  return array.map((item) =>
    dataArray.find((dataItem) => dataItem[key] == item)
  )
}

// Dato un array products del tipo { product: 'A', price: 100, quantity: 1, special: true }
// e un oggetto discounts del tipo { default: 10, special: 20 } (dove sia default sia special potrebbero non esserci),
// calcolare il prezzo finale dei prodotti con l'eventuale sconto applicato,
// considerando che ai prodotti con special = true si applica la percentuale specificata in discount.special,
// agli altri prodotti la percentuale specificata in discounts.default
export function getTotal(products, discounts) {
  return products.reduce((acc, product) => {
    const discount = product.special
      ? discounts.special ?? 0
      : discounts.default ?? 0
    const result = acc + product.price * product.quantity * (1 - discount / 100)
    return Math.round(result * 100) / 100
  }, 0)
}

// Dati un array di post, di commenti e di utenti (vedere in mock.js), creare un nuovo array dove ogni post include:
// - un campo `user` con l'oggetto intero dell'utente che corrisponde a `userId` (che va poi rimosso)
// - un campo `comments` che è un array di tutti i commenti associati a quel post (in base a `postId`, che va poi rimosso)
// Dentro ogni commento deve esserci un campo `user` con l'oggetto intero dell'utente che ha scritto il commento (corrispondente a `userId`, che va poi rimosso)
// Se non ci sono commenti, comments deve essere un array vuoto
// Controllare il risultato del test per vedere come deve essere l'array finale
export function populatePosts(posts, comments, users) {
  return posts.map((post) => {
    const user = users.find((user) => user.id === post.userId)
    const postComments = comments
      .filter((comment) => comment.postId === post.id)
      .map((comment) => {
        const commentUser = users.find((user) => user.id === comment.userId)
        delete comment.userId
        delete comment.postId
        return { ...comment, user: commentUser }
      })
    delete post.userId
    return { ...post, user, comments: postComments }
  })
}

// Implementare il metodo nativo Array.map()
export function map(array, mapper) {
  const result = []
  for (let i = 0; i < array.length; i++) {
    result.push(mapper(array[i], i))
  }
  return result
}

// Implementare il metodo nativo Array.filter()
export function filter(array, predicate) {
  const result = []
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i)) {
      result.push(array[i])
    }
  }
  return result
}

// Implementare il metodo nativo Array.some()
export function some(array, predicate) {
  for (const item of array) {
    if (predicate(item)) {
      return true
    }
  }
  return false
}

// Implementare il metodo nativo Array.every()
export function every(array, predicate) {
  for (const item of array) {
    if (!predicate(item)) {
      return false
    }
  }
  return true
}

// Implementare il metodo nativo Array.reduce()
export function reduce(array, reducer, initialState) {
  // User first item for initializing the accumulator
  let acc = initialState
  if (!initialState) {
    switch (typeof array[0]) {
      case 'number':
        acc = 0
        break
      case 'string':
        acc = ''
        break
      default:
        acc = {}
        break
    }
  }
  for (let i = 0; i < array.length; i++) {
    acc = reducer(acc, array[i], i)
  }
  return acc
}

// Dato un array e una funzione, spostare alla fine dell'array l'elemento per il quale la funzione ritorna true
// Nota: soltanto uno degli elementi soddisfa la funzione shouldMove
export function moveToEnd(array, shouldMove) {
  const index = array.findIndex(shouldMove)
  return index === -1
    ? array
    : [...array.slice(0, index), ...array.slice(index + 1), array[index]]
}
