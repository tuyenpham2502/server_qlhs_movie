export const validateImageFile = (imageName: string) => {
    const lowerImageName = imageName.toLowerCase();
    return lowerImageName.endsWith('.png') || lowerImageName.endsWith('.jpg') || lowerImageName.endsWith('.jpeg') || lowerImageName.endsWith('.gif');
}
