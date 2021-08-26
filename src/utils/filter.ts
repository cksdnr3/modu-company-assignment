type KeysType = {
    [key: string]: string[];
}

type StrIndex = {
    [key: string]: any;
}

export type FilterTagsType = {
    [key: string]: TagsType
}

export type TagsType = {
    [key: string]: boolean;
}

export default function filter<Item extends StrIndex>(filterTags: FilterTagsType, items: Item[]): Item[] {
    const filterMultiple = (items: Item[], filters: KeysType): Item[] => {
        const filterKeys: string[] = Object.keys(filters);
        return items.filter((item: Item) => {
            return filterKeys.every((key: string) => {
                if (!filters[key].length) return true;
                return filters[key].includes(item[key]); 
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
