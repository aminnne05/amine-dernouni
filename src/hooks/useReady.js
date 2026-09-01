import { createContext, useContext } from "react";

/*
  Vrai une fois l'écran de chargement retiré. Les animations d'entrée
  attendent ce signal pour ne pas se jouer derrière l'écran de chargement.
*/
export const ReadyContext = createContext(true);

export default function useReady() {
  return useContext(ReadyContext);
}
