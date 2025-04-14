interface Subcategory {
    id: number,
    name: string;
    link: string;
}

interface SubcategoryTitle {
    name: string;
    link: string;
}

interface Categories {
    id: number,
    title: SubcategoryTitle[],
    image: string,
    subcategories: Subcategory[]
}

export const categories: Categories[] = [
    {
        id: 0,
        title: [
            { name: "Термобілизна Craft", link: "/termobilizna" }
        ],
        image: "/termobilizna.webp",
        subcategories: [
            { id: 0, name: "Чоловіча термобілизна", link: "/cholovicha-termobilizna" },
            { id: 1, name: "Жіноча термобілизна", link: "/zhinocha-termobilizna" },
            { id: 2, name: "Дитяча термобілизна", link: "/dityacha-termobilizna" },
            { id: 3, name: "На кожен день", link: "/termobiluzna-na-kozhen-den" },
            { id: 4, name: "Термобілизна для спорту", link: "/termobilyzna-dlia-sportu" },
            { id: 5, name: "Спортивна спідня білизна", link: "/sportyvna-bilyzna" },
        ],
    },
    {
        id: 1,
        title: [
            { name: "Одяг для бігу та фітнесу", link: "/odiah-dlia-bihu-ta-fitnesu" }
        ],
        image: "/odyagdlybigu.webp",
        subcategories: [
            { id: 0, name: "Футболки для бігу та фітнесу", link: "/futbolky-dlia-bigu-ta-fitnesu" },
            { id: 1, name: "Кофти для бігу та фітнесу", link: "/kofty-dlia-bihu-ta-fitnesu" },
            { id: 2, name: "Куртки для бігу", link: "/kurtky-dlia-bigu" },
            { id: 3, name: "Тайці та штани", link: "/taitsy-ta-shtany" },
            { id: 4, name: "Шорти для бігу", link: "/shorty-dlia-bigu" },
            { id: 5, name: "Жіночі топи для спорту", link: "/zhinochi-topy-dlia-sportu" },
        ],
    },
];