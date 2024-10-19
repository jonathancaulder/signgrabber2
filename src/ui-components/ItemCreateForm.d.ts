/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ItemCreateFormInputValues = {
    title?: string;
    description?: string;
    email?: string;
    phone?: string;
    text?: string;
    url?: string;
    price?: string;
    status?: string;
    latitude?: number;
    longitude?: number;
    image?: string;
    bucketkey?: string;
    image2?: string;
    bucketkey2?: string;
    image3?: string;
    bucketkey3?: string;
    image4?: string;
    bucketkey4?: string;
    image5?: string;
    bucketkey5?: string;
    category?: string;
    userid?: string;
};
export declare type ItemCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    text?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    price?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    latitude?: ValidationFunction<number>;
    longitude?: ValidationFunction<number>;
    image?: ValidationFunction<string>;
    bucketkey?: ValidationFunction<string>;
    image2?: ValidationFunction<string>;
    bucketkey2?: ValidationFunction<string>;
    image3?: ValidationFunction<string>;
    bucketkey3?: ValidationFunction<string>;
    image4?: ValidationFunction<string>;
    bucketkey4?: ValidationFunction<string>;
    image5?: ValidationFunction<string>;
    bucketkey5?: ValidationFunction<string>;
    category?: ValidationFunction<string>;
    userid?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ItemCreateFormOverridesProps = {
    ItemCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    latitude?: PrimitiveOverrideProps<TextFieldProps>;
    longitude?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    bucketkey?: PrimitiveOverrideProps<TextFieldProps>;
    image2?: PrimitiveOverrideProps<TextFieldProps>;
    bucketkey2?: PrimitiveOverrideProps<TextFieldProps>;
    image3?: PrimitiveOverrideProps<TextFieldProps>;
    bucketkey3?: PrimitiveOverrideProps<TextFieldProps>;
    image4?: PrimitiveOverrideProps<TextFieldProps>;
    bucketkey4?: PrimitiveOverrideProps<TextFieldProps>;
    image5?: PrimitiveOverrideProps<TextFieldProps>;
    bucketkey5?: PrimitiveOverrideProps<TextFieldProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
    userid?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ItemCreateFormProps = React.PropsWithChildren<{
    overrides?: ItemCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ItemCreateFormInputValues) => ItemCreateFormInputValues;
    onSuccess?: (fields: ItemCreateFormInputValues) => void;
    onError?: (fields: ItemCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItemCreateFormInputValues) => ItemCreateFormInputValues;
    onValidate?: ItemCreateFormValidationValues;
} & React.CSSProperties>;
export default function ItemCreateForm(props: ItemCreateFormProps): React.ReactElement;
