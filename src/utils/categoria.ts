import food from "../assets/food.svg"
import other from "../assets/others.svg"
import services from "../assets/services.svg"
import transport from "../assets/transport.svg"
import accommodation from "../assets/accommodation.svg"

export const categories = {
    food: {
        name: "Alimentação",
        icon: food
    },
    other: {
        name: "Outros",
        icon: other
    },
    services: {
        name: "Serviços",
        icon: services
    },
    transport: {
        name: "Transporte",
        icon: transport
    },
    accommodation: {
        name: "Hospedagem",
        icon: accommodation
    }
}

export const categories_keys = Object.keys(categories) as Array<keyof typeof categories>