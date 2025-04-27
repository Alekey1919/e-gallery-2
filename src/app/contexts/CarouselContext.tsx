import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
} from "react";

interface ICarouselContext {
  carouselContainerRef: RefObject<HTMLDivElement | null>;
  carouselTargetRef: RefObject<HTMLDivElement | null>;
  setAnimationFinished: Dispatch<SetStateAction<boolean>>;
  animationFinished: boolean;
}

const CarouselContext = createContext({});

export const CarouselContextProvider = ({
  children,
  state,
}: {
  children: any;
  state: ICarouselContext;
}) => {
  return (
    <CarouselContext.Provider value={state}>
      {children}
    </CarouselContext.Provider>
  );
};

const useCarouselContext = () => {
  const state = useContext(CarouselContext) as ICarouselContext;

  return state;
};

export default useCarouselContext;
