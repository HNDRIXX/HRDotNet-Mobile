import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export const Utils = {
    fileAttach: async ( setSelectedFile ) => {
        try {
            const result = await DocumentPicker.getDocumentAsync()

            if (!result.canceled){
                const fileInfo = result.assets[0]
                const uri = fileInfo.uri

                const fileExtension = uri.substring(uri.lastIndexOf('.') + 1).toLowerCase()
                
                const fileSizeInMB = fileInfo.size / (1024 * 1024)

                if (fileSizeInMB <= 5 && ['docx', 'pdf', 'jpeg', 'jpg', 'txt'].includes(fileExtension)) {
                    setSelectedFile(fileInfo.uri)
                } else {
                    if (fileSizeInMB > 5) {
                        Alert.alert('File Too Large', 'Please select a file with a size of 5MB or less.')
                    } else {
                        Alert.alert('Unsupported File Format', 'Please select a docx, pdf, jpeg, jpg, or txt file.')
                    }
                }
            }
        } catch (error) {
            console.error('Error picking document:', error)
        }
    }
}