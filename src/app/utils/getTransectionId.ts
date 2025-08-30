export const generateTransectionId = () => {
    const result = `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return result
}