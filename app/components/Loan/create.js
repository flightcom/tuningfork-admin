import React from 'react';
import {
    Create,
    DateInput,
    FormTab,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    email,
    required,
} from 'admin-on-rest';

const instrumentOptionRenderer = choice => `${choice.brand.name} ${choice.model}`;
const userOptionRenderer = choice => `${choice.first_name} ${choice.last_name}`;

const LoanCreate = (props) => (
    <Create title="Nouveau prêt" {...props}>
        <SimpleForm>
            {/* User */}
            <ReferenceInput
                label="Utilisateur"
                source="user_id"
                reference="users"
                filter={{
                    status: 'ACTIVE',
                    has_subscribed: true,
                    has_active_loan: false,
                }}
                allowEmpty
                >
                <SelectInput optionText={userOptionRenderer} />
            </ReferenceInput>
            {/* Instrument */}
            <ReferenceInput
                label="Instrument"
                source="instrument_id"
                reference="instruments"
                filter={{
                    to_be_checked: false
                }}
                allowEmpty
                >
                <SelectInput optionText={instrumentOptionRenderer} />
            </ReferenceInput>
            <DateInput
                label="Date de début"
                source="starts_at"
            />
        </SimpleForm>
    </Create>
);

export default LoanCreate;
