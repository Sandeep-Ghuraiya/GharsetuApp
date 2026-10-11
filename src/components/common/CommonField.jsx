/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Controller} from 'react-hook-form';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
//import {useThemeColors} from '../../hooks/useThemeColors';
import ImageUploadField from '../upload/ImageUpload';
import {Ionicons} from '@react-native-vector-icons/ionicons';
import {AntDesign} from '@react-native-vector-icons/ant-design';
import {useDispatch} from 'react-redux';
import {getZipLocationList} from '../../Redux/Reducers/locationReducer';
import CustomRadioButton from '../custom/CustomRadioButton';
//import MultiDropDownFeatures from '../../models/MultiDropDownFeatures';

const CommonField = ({
  control,
  name,
  label,
  placeholderText,
  options = [],
  type = 'select',
  errors = {},
  disableState = true,
  setPropertyValue,
  required = false,
  getValue,
  allPropertyImage = [],
  handleDraftFields,
}) => {
  const dispatch = useDispatch();

  const isNumber = type === 'number';
  const [isFocus, setIsFocus] = useState(false);
  const [multiValue, setMultiValue] = useState([]);
  const hasError = errors[name];

  // if(name==='popertyFacilitiesId'){
  // console.log('name',multiValue);
  // }

  // const toggleItem = val => {
  //   if (multiValue.includes(val)) {
  //     // Remove selected
  //     setMultiValue(multiValue.filter(item => item !== val));
  //   } else {
  //     // Add selected
  //     setMultiValue([...multiValue, val]);
  //   }
  // };

  // const labelField = name === 'popertyFacilitiesId' ? 'name' : 'label';
  // const valueField = name === 'popertyFacilitiesId' ? 'id' : 'value';

  const renderItem = item => {
    const isSelected =
      Array.isArray(multiValue) && multiValue.includes(item.value);

    return (
      <View style={styles.item}>
        <View style={styles.row}>
          {/* Checkbox */}
          <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
            {isSelected && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>

          <Text style={styles.itemText}>{item.label}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {label && <Text style={[styles.label]}>{label}</Text>}
        {required && <Text style={{color: 'red', fontSize: 16}}>*</Text>}
      </View>

      <Controller
        control={control}
        name={name}
        render={({field: {value, onChange}}) => {
          // console.log(name, ':-',value,);
          return (
            <>
              {type === 'select' ? (
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && {borderColor: '#007AFF'},
                    !disableState && {backgroundColor: '#f0f0f0'},
                  ]}
                  placeholderStyle={styles.placeholder}
                  selectedTextStyle={styles.selectedText}
                  itemTextStyle={styles.itemTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={options}
                  search={false}
                  labelField="label"
                  valueField="value"
                  placeholder={placeholderText}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    onChange(item.value);
                    handleDraftFields(name, item.value);
                    setIsFocus(false);
                    if (name === 'propertyType' || name === 'totalFloor') {
                      setPropertyValue(item.value);
                    }
                  }}
                  disable={!disableState}
                />
              ) : type === 'multiselect' ? (
                <MultiSelect
                  style={[
                    styles.dropdown,
                    {color: '#000'},
                    isFocus && {borderColor: '#007AFF'},
                  ]}
                  placeholderStyle={styles.placeholder}
                  selectedTextStyle={styles.selectedText}
                  itemTextStyle={styles.itemTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={options}
                  search={true}
                  labelField={'label'}
                  valueField={'value'}
                  placeholder={placeholderText}
                  value={value} // value must be an array: ['a','b']
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={items => {
                    // console.log('item', items);
                    onChange(items);
                    setMultiValue(items); // items is an array of selected values
                    handleDraftFields(name, items);
                    setIsFocus(false);
                  }}
                  selectedStyle={styles.selectedStyle}
                  renderItem={item => renderItem(item)}
                  iconStyle={styles.iconStyle}
                  renderLeftIcon={() => (
                    <View style={{marginRight: 8}}>
                      <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="safety"
                        size={20}
                      />
                    </View>
                  )}
                />
              ) : type === 'image' ? (
                <ImageUploadField
                  onChange={val => {
                    onChange(val);
                    handleDraftFields(name, val);
                  }}
                  allPropertyImage={allPropertyImage}
                />
              ) : type === 'radio' ? (
                <CustomRadioButton
                  label1={'Yes'}
                  label2={'No'}
                  selected={value}
                  onPress={val => {
                    onChange(val);
                    handleDraftFields(name, val);
                  }}
                  value1={'1'}
                  value2={'0'}
                />
              ) : type === 'customselect' ? (
                <View style={{}}>
                  {options.map(item => {
                    const formattedFeatures = item.features.map(item => ({
                      label: item,
                      value: item,
                    }));

                    return (
                      <MultiSelect
                        mode="modal"
                        confirmSelectItem={true}
                        style={[styles.dropdown, {marginBottom: 5}]}
                        data={formattedFeatures}
                        search
                        labelField="label"
                        valueField="value"
                        placeholder={item.category}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={items => {
                          onChange(items);
                          setMultiValue(items); // items is an array of selected values
                          handleDraftFields(name, items);
                          setIsFocus(false);
                        }}
                        containerStyle={{height: 600}}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        itemTextStyle={styles.itemTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        renderItem={item => renderItem(item)}
                      />
                    );
                  })}
                </View>
              ) : (
                <TextInput
                  value={value}
                  onChangeText={val => {
                    onChange(val);
                    handleDraftFields(name, val);
                    if (name === 'zipcode') {
                      const action = {
                        action: 'resolve_pincode',
                        pincode: val,
                      };
                      dispatch(getZipLocationList(action));
                    }
                  }}
                  placeholder={placeholderText}
                  placeholderTextColor="#555"
                  style={[
                    styles.input,
                    type === 'textarea' && styles.textarea,
                    !disableState && {backgroundColor: '#f0f0f0'},
                  ]}
                  multiline={type === 'textarea'}
                  keyboardType={isNumber ? 'number-pad' : 'default'}
                  editable={disableState}
                />
              )}
            </>
          );
        }}
      />
      {/* Error Message */}
      {hasError && (
        <Text style={styles.errorText}>{errors[name]?.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: '#000',
  },
  dropdown: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  textarea: {
    height: 100,
    paddingTop: 10,
  },
  placeholder: {
    color: '#666',
    fontSize: 15,
  },
  itemTextStyle: {
    color: '#000',
  },
  selectedText: {
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  inputSearchStyle: {
    height: 45,
    fontSize: 15,
    borderRadius: 10,
    color: '#000',
  },

  selectedStyle: {
    borderRadius: 10,
    backgroundColor: '#E9F3FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 8,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconStyle: {
    width: 22,
    height: 22,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#333',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },

  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  multiInput: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
});

export default CommonField;
