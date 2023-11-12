import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

import { COLORS } from '../../../constant';
import SuccessPromptPage from '../../../components/prompt/SuccessPrompt';

export default function VerifyCodePage({ navigation }) {
  const [code, setCode] = useState(['', '', '', '']);
  const codeRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)
  const [countdown, setCountdown] = useState(99999)
  const [isEnabled, setEnabled] = useState(false)

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(countdown - 1)
      }, 1000)

      return () => clearInterval(interval)
    } else {
      setEnabled(true)
    }
  }, [countdown])

  useEffect(() => {
    codeRefs[0].current.focus()
  }, [])

  const handleCodeChange = (text, index) => {
    if (text === '' || /^[0-9]$/.test(text)) {
      const newCode = [...code]
      newCode[index] = text
      setCode(newCode)
  
      if (text === '' && index > 0) {
        codeRefs[index - 1].current.focus()
      } else if (text.length === 1 && index < 3) {
        codeRefs[index + 1].current.focus()
      }
    }
  }

  const codeResult = code.join('');
  const isSubmitDisabled = code.some((value) => value.length !== 1);

  const openCustomAlert = () => {
    setIsSuccessAlertVisible(true)
    console.log(codeResult)
  }

  const closeCustomAlert = () => {
    setIsSuccessAlertVisible(false)
    navigation.navigate('ResetPassword')
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name='arrowleft' size={28} color={COLORS.orange} />
      </TouchableOpacity>

      <View style={styles.wrapper}>
        <Text style={styles.verificationText}>Verification</Text>
        <Text style={styles.subText}>We sent a 4-digit verification code to your email address</Text>

        <View style={styles.codeContainer}>
          {code.map((value, index) => (
            <TextInput
              key={index}
              style={styles.input}
              onChangeText={(text) => handleCodeChange(text, index)}
              value={value}
              keyboardType="numeric"
              maxLength={1}
              ref={codeRefs[index]}
              autoFocus={index === 0} 
            />
          ))}
        </View>

        <View style={styles.resendWrapper}>
          <Text>Didn't receive a code?</Text>
          <Text style={{ fontSize: 20 }}>{countdown > 0 ? countdown : null }</Text>
          <TouchableOpacity 
            style={styles.resendButton}
            disabled={!isEnabled}
          >
            <Text style={[styles.resendText, !isEnabled && { color: COLORS.lightGray2 }]}>Resend</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.verifyBtn, isSubmitDisabled ? styles.disabledBtn : null]}
          onPress={openCustomAlert}
          disabled={isSubmitDisabled}
        >
          <Text style={styles.textBtn}>VERIFY</Text>
        </TouchableOpacity>
      </View>

      <SuccessPromptPage
        title={"Verified"}
        subTitle={"You have successfully verfied the account"}
        buttonText={"UPDATE PASSWORD"}
        visible={isSuccessAlertVisible} 
        onClose={closeCustomAlert} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.clearWhite,
  },
  
  backBtn: {
    width: 60,
    height: 60,
    alignItems: 'center',
    marginTop: 60,
  },

  verificationText: {
    fontFamily: 'Inter_700Bold',
    color: COLORS.black,
    fontSize: 26,
    textAlign: 'center',
  },

  subText: {
    fontFamily: 'Inter_400Regular',
    color: COLORS.black,
    textAlign: 'center',
    alignSelf: 'center',
    width: '70%',
  },

  wrapper: {
    flex: 1,
    margin: 30,
    marginTop: 0,
    justifyContent: 'center',
  },

  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },

  input: {
    width: 60,
    height: 60,
    marginHorizontal: 12,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 27,
    backgroundColor: COLORS.clearWhite,
    fontFamily: 'Inter_600SemiBold',

    elevation: 5,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5, 
    shadowRadius: 5, 
  },

  singleInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: COLORS.clearWhite,
    borderRadius: 30,
    marginBottom: 15,

    elevation: 7,
    shadowColor: COLORS.tr_gray,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5, 
    shadowRadius: 5,
  },

  resendWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 100,
  },
  
  resendButton: {
    paddingHorizontal: 5,
  },

  resendText: {
    color: COLORS.orange,
    fontFamily: 'Inter_700Bold',
  },

  verifyBtn: {
    backgroundColor: COLORS.orange,
    padding: 14,
    alignItems: 'center',
    alignSelf: 'center',
    width: 180,
    borderRadius: 30,
  },

  textBtn: {
    color: COLORS.clearWhite,
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 15,
  },

  disabledBtn: {
    backgroundColor: 'gray',
    opacity: 0.3,
  },
})