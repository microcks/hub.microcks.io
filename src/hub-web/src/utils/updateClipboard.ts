export const updateClipboard = (newClip: string, onSuccess = () => {}, onError = () => {}) => {
    navigator.clipboard.writeText(newClip).then(
        onSuccess,
        onError,
    );
}
