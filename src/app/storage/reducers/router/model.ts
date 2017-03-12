interface RouterModel {
    current: string,
    params: {
        [name: string]: string
    }
}

export { RouterModel };