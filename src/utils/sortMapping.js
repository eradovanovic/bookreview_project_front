import {SORT} from "../constants/constants";

export const sortHandler = sortBy => {
    switch (sortBy) {
        case SORT.DEFAULT:
            return {
                sortBy: 'id',
                order: 'asc'
            }
        case SORT.RATING_ASC:
            return {
                sortBy: 'rating',
                order: 'asc'
            }
        case SORT.RATING_DESC:
            return {
                sortBy: 'rating',
                order: 'desc'
            }
        case SORT.TITLE_ASC:
            return {
                sortBy: 'title',
                order: 'asc'
            }
        case SORT.TITLE_DESC:
            return {
                sortBy: 'title',
                order: 'desc'
            }
    }
}
