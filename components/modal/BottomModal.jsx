import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";
import * as Animatable from 'react-native-animatable';
import BottomSheet from '@gorhom/bottom-sheet';

import { COLORS } from "../../constant";

export default function BottomModal ({isBackdrop, setBackdrop, isModal, setModal, modalContent}) {
    const bottomSheetRef = useRef(null)

    const openBottomSheet = () => {
        bottomSheetRef.current.expand();
    }
    
    const closeBottomSheet = () => {
        setModal(false)
        setBackdrop(false)
        bottomSheetRef.current.close();
    }

     return (
        <BottomSheet
            ref={bottomSheetRef}
            index={isModal ? 1 : -1}
            snapPoints={['50%', '70%']}
            enablePanDownToClose
            backdropComponent={() => (
                isBackdrop && (
                    <Animatable.View
                        animation={'fadeIn'}
                        duration={300}
                        style={{ opacity: 1, ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(64, 64, 64, 0.15)'  }}
                    ></Animatable.View>
                )
            )}
            onChange={(index) => index === -1 && (setBackdrop(false), setModal(false))}
        >
            {modalContent}
        </BottomSheet>
     )
}