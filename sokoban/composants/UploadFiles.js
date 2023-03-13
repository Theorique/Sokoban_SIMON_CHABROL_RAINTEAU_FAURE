import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const FilePickerButton = () => {
    const [pickedFile, setPickedFile] = useState(null);

    const pickFile = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setPickedFile(result);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={{ margin: 40}}>
            <TouchableOpacity onPress={pickFile}>
                <Text>Pick a file</Text>
            </TouchableOpacity>
            {pickedFile && (
                <Text>Selected file: {pickedFile.name}</Text>
            )}
        </View>
    );
};

export default FilePickerButton;