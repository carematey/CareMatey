export const handleDeleteTag = (
    index: number,
    newCardValues: {
        title: string;
        text: string;
        tags: string[];
    },
    setNewCardValues: React.Dispatch<
        React.SetStateAction<{
            title: string;
            text: string;
            tags: string[];
        }>
    >
): void => {
    const newTagValues: string[] = newCardValues.tags.filter((card) => {
        return card !== newCardValues.tags[index];
    });
    setNewCardValues({ ...newCardValues, tags: newTagValues });
};