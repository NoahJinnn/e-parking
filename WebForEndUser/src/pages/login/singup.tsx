import React, { useEffect, useState } from 'react';

import { HeaderGradientIcon } from '@components/headerGradientIcon';
import { RippleButton } from '@components/rippleButton';
import { POLICY_URL } from '@config';
import { useTypedTranslation } from '@languages/typedTranslation';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

export const LoginSignUpPage: IComponent<{
    onSubmitInfo: (info: IUserSignUpInfo) => void;
}> = (props) => {
    const { t } = useTypedTranslation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDay, setBirthDay] = useState(new Date());
    const [isAcceptPolicy, setIsAcceptPolicy] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);

    const onAcceptPolicy = (e: any, checked: boolean) => {
        setIsAcceptPolicy(checked);
    };

    const onSubmit = () => {
        props.onSubmitInfo?.({
            firstName,
            lastName,
            birthDay,
        });
    };

    useEffect(() => {
        if (firstName.length > 0 && lastName.length > 0 && birthDay && isAcceptPolicy) {
            setIsValidForm(true);
        } else {
            setIsValidForm(false);
        }
    }, [firstName, lastName, birthDay, isAcceptPolicy]);

    return (
        <div className="w-100 tl-ns tc pb4">
            <div className="w-100 db-ns dn pb3">
                <HeaderGradientIcon size={96} src="/images/user.svg" />
            </div>
            <p className="pa0 f2 ma0 mb2 hard">{t("loginInfoTitle")}</p>
            <p className="w-50-ns f5 w-70-m w-100 pa0 ma0 light">{t("loginInfoSubTitle")}</p>
            <div className="mt3 w-100" onSubmit={() => {}}>
                <div className="flex flex-column">
                    <TextField
                        margin={"normal"}
                        size="medium"
                        className="w-100 mwx7-ns"
                        label={t("firstName")}
                        variant="outlined"
                        type="name"
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                    <TextField
                        margin={"normal"}
                        size="medium"
                        className="w-100 mwx7-ns"
                        label={t("lastName")}
                        variant="outlined"
                        type="name"
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                    <div className="w-100 mwx7-ns">
                        <DatePicker
                            margin={"normal"}
                            inputVariant="outlined"
                            label={t("birth")}
                            className="w-100 pa2"
                            format="dd/MM/yyyy"
                            value={birthDay}
                            DialogProps={{ className: "dialog__date" }}
                            onChange={(e) => setBirthDay(e as Date)}
                        />
                    </div>
                    <FormControlLabel
                        className="mt2 f5 w-100"
                        control={<Checkbox checked={isAcceptPolicy} onChange={onAcceptPolicy} name="acceptTerm" color="primary" />}
                        label={
                            <p className="tl hard">
                                {t("loginInfoAcceptPolicy")}{" "}
                                <a target="_blank" rel="noopener noreferrer" href={POLICY_URL}>
                                    {t("loginInfoAcceptPolicyLink")}
                                </a>
                            </p>
                        }
                    />
                    <RippleButton
                        className="mt2 mwx5-ns bg-silver white center-items"
                        disabled={!isValidForm}
                        onClick={onSubmit}
                        activeClass="bg-prime white shadow">
                        <strong>Create account</strong>
                    </RippleButton>
                </div>
            </div>
        </div>
    );
};
