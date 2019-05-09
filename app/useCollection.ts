import { useState, useEffect } from 'react'
import { db } from './firebase'

export const useCollection = (path: string, orderBy: string): unknown[] => {
  const [fireBaseDocs, setFireBaseDocs] = useState<unknown[]>([])
  useEffect((): any => {
    return (
      db
        .collection(path)
        .orderBy(orderBy)
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        .onSnapshot(snapshot => {
          const docs: object[] = []
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          snapshot.forEach(doc => docs.push({ ...doc.data(), id: doc.id }))
          setFireBaseDocs(docs)
        })
    )
  }, [])
  return fireBaseDocs
}
