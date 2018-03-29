import React from 'react';
import {
    Create,
    ReferenceInput,
    ReferenceArrayInput,
    SelectInput,
    SimpleForm,
    TextInput,
    required,
} from 'admin-on-rest';

import CustomSelectArrayInput from '../Input/CustomSelectArrayInput';

let selectedCategoryId = null;

const handleOnChange = (chips) => {
    console.log('HANDLE ON CHANGE');
    const keys = Object.keys(chips)
        .filter((name) => name !== 'preventDefault')
        .sort()
        .reverse();
    selectedCategoryId = chips[keys[0]];
}

export const InstrumentCreate = (props) => (
    <Create title="Nouvel instrument" {...props}>
        <SimpleForm>
            {/* Basic Informations */}
            <TextInput label="Modèle" source="model" validate={required} />
            <TextInput label="Numéro de série" source="serial_number" />
            <TextInput label="Code barre" source="barcode" />
            <ReferenceInput
                label="Marque"
                source="brand_id"
                reference="brands"
                allowEmpty
                validate={required}
            >
                <SelectInput />
            </ReferenceInput>
            <ReferenceArrayInput
                label="Catégorie"
                source="category_ids"
                reference="categories"
                filterToQuery={(searchText) => ({ category_id: selectedCategoryId })}
                onChange={handleOnChange}
                allowEmpty
                validate={required}
            >
                <CustomSelectArrayInput />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);
