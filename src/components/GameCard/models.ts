import { CardImagesInterface } from "../../shared/models/cardImages.interface"

export interface GameCardProps {
  item: CardImagesInterface;
  handleChoice: (item: CardImagesInterface) => void;
}
