import { Button } from "./Button"

import left from "../assets/left.svg"
import right from "../assets/right.svg"

type Props = {
    current: number,
    total: number,
    onNext: () => void,
    onBack: () => void
}

export function Pagination({ current, total, onBack, onNext }: Props) {
    return(
        <div className="flex flex-1 justify-center items-center gap-2">

            <Button variant="iconSmall" onClick={onBack} disabled={current === 1}>
                <img src={left} alt="ícone de voltar" />
            </Button>

            <span className="text-sm text-gray-200" >
                {current}/{total}
            </span>

            <Button variant="iconSmall" onClick={onNext} disabled={current === 10}>
                <img src={right} alt="ícone de avançar" />
            </Button>
        </div>
    )
}