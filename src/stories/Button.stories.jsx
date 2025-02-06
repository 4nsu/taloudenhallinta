import Button from '../shared/buttons'

/**
 * Painike-komponentti, joka on siirrettävissä helposti myös toisiin projekteihin.
 */
export default {
    title: 'shared/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        disabled: { control: 'boolean',
                    description: 'Onko nappi aktiivinen?',
                    defaultValue: {summary: 'false'},
        },
        children: { control: 'text',
                    description: 'Napin teksti', 
        },
        primary: { control: 'boolean',
                   description: 'Onko nappi pääpainike?',
                   defaultValue: {summary: 'false'}, 
        },
        secondary: { control: 'boolean',
                     description: 'Onko nappi toissijainen painike?',
                     defaultValue: {summary: 'false'}, 
        },
    },
    args: {
        disabled: false,
        children: 'Press me!',
        primary: false,
        secondary: false,
    }
}

export const Default = (args) => <Button {...args} />

export const Primary = (args) => <Button {...args} />

Primary.args = {
    primary: true,
    children: 'Primary button',
}

export const Secondary = (args) => <Button {...args} />

Secondary.args = {
    secondary: true,
    children: 'Secondary button',
}

export const Disabled = (args) => <Button {...args} />

Disabled.args = {
    disabled: true,
    children: 'Disabled button',
}