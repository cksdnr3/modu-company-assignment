type KeysType = {
    [key: string]: string[];
}

type StrIndex = {
    [key: string]: string | number | undefined;
}

type FilterTagsType = {
    [key: string]: TagsType
}

type TagsType = {
    [key: number]: boolean;
    [key: string]: boolean;
}

export default function filter<Item extends StrIndex>(filterTags: FilterTagsType, items: Item[]): Item[] {
    const filterMultiple = (items: Item[], filters: KeysType): Item[] => {
        const filterKeys: string[] = Object.keys(filters);
        return items.filter((item: Item) => {
            return filterKeys.every((key: string) => {
                if (!filters[key].length) return true;
                return filters[key].includes(String(item[key])); 
            });
        })
    };

    const collectTrueFilter = (): KeysType => {
        const filterKeys = Object.keys(filterTags);
        const collectedKeys: KeysType = filterKeys.reduce((prev, key) => {
            const filteredTags = filterTags[key];
            return {
                ...prev, [key]: Object.keys(filteredTags).filter((tag) => filteredTags[tag])
            }
        }, {});

        return collectedKeys;
    };

    return filterMultiple(items, collectTrueFilter());
}
