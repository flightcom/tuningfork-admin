import React from 'react';
import {
    CreateButton,
    DeleteButton,
    Edit,
    ListButton,
    ReferenceInput,
    ReferenceArrayInput,
    SelectArrayInput,
    SelectInput,
    SimpleForm,
    TextInput,
    required,
} from 'react-admin';

import { CardActions } from 'material-ui/Card';

// import CustomSelectArrayInput from '../Input/CustomSelectArrayInput';
// import CategoryReferenceArrayInput from '../Input/CategoryReferenceArrayInput';

let selectedCategoryId = null;

const handleOnChange = (chips) => {
    const keys = Object.keys(chips)
        .filter((name) => name !== 'preventDefault')
        .sort()
        .reverse();
    selectedCategoryId = chips[keys[0]];
};

const InstrumentTitle = ({ record }) => (
    <span>{record ? `${record.brand.name} ${record.model} ${record.serial_number}` : ''}</span>
);

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const InstrumentEdit = (props) => (
    <Edit title={<InstrumentTitle />} {...props}>
        <SimpleForm>
            {/* Basic Informations */}
            <TextInput label="Modèle" source="model" validate={required()} />
            <TextInput label="Numéro de série" source="serial_number" />
            <TextInput label="Code barre" source="barcode" />
            <ReferenceInput
                label="Marque"
                source="brand_id"
                reference="brands"
                validate={required()}
            >
                <SelectInput />
            </ReferenceInput>
            {/* <div><CreateButton basePath={'/brands'} /></div> */}
            {/* <CategoryReferenceArrayInput> */}
                <ReferenceArrayInput
                    label="Catégorie"
                    source="category_ids"
                    reference="categories"
                    onChange={handleOnChange}
                    filterToQuery={(searchText) => ({ category_id: selectedCategoryId })}
                    validate={required()}
                >
                    <SelectArrayInput />
                    {/* <CustomSelectArrayInput /> */}
                </ReferenceArrayInput>
            {/* </CategoryReferenceArrayInput> */}
        </SimpleForm>
    </Edit>
);

export default InstrumentEdit;
