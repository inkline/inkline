export const manifest = {
    name: 'colors',
    css: {
        variables: [
            {
                name: 'color--primary--h',
                value: '195.0967741935deg',
                description: 'The hue part of the design system primary color'
            },
            {
                name: 'color--primary--s',
                value: '77.1144278607%',
                description: 'The saturation part of the design system primary color'
            },
            {
                name: 'color--primary--l',
                value: '39.4117647059%',
                description: 'The lightness part of the design system primary color'
            },
            {
                name: 'color--primary',
                value: 'hsl(var(--color--primary--h), var(--color--primary--s), var(--color--primary--l))',
                modifiers: ['shade'],
                description: 'The computed primary color of the design system'
            },
            {
                name: 'color--secondary--h',
                value: '262.2857142857deg',
                description: 'The hue part of the design system secondary color'
            },
            {
                name: 'color--secondary--s',
                value: '30.1724137931%',
                description: 'The saturation part of the design system secondary color'
            },
            {
                name: 'color--secondary--l',
                value: '54.5098039216%',
                description: 'The lightness part of the design system secondary color'
            },
            {
                name: 'color--secondary',
                value: 'hsl(var(--color--secondary--h), var(--color--secondary--s), var(--color--secondary--l))',
                modifiers: ['shade'],
                description: 'The computed secondary color of the design system'
            },
            {
                name: 'color--info--h',
                value: '173.8888888889deg',
                description: 'The hue part of the design system info color'
            },
            {
                name: 'color--info--s',
                value: '42.8571428571%',
                description: 'The saturation part of the design system info color'
            },
            {
                name: 'color--info--l',
                value: '49.4117647059%',
                description: 'The lightness part of the design system info color'
            },
            {
                name: 'color--info',
                value: 'hsl(var(--color--info--h), var(--color--info--s), var(--color--info--l))',
                modifiers: ['shade'],
                description: 'The computed info color of the design system'
            },
            {
                name: 'color--warning--h',
                value: '43.6764705882deg',
                description: 'The hue part of the design system warning color'
            },
            {
                name: 'color--warning--s',
                value: '100%',
                description: 'The saturation part of the design system warning color'
            },
            {
                name: 'color--warning--l',
                value: '73.3333333333%',
                description: 'The lightness part of the design system warning color'
            },
            {
                name: 'color--warning',
                value: 'hsl(var(--color--warning--h), var(--color--warning--s), var(--color--warning--l))',
                modifiers: ['shade'],
                description: 'The computed warning color of the design system'
            },
            {
                name: 'color--danger--h',
                value: '1.3259668508deg',
                description: 'The hue part of the design system danger color'
            },
            {
                name: 'color--danger--s',
                value: '87.4396135266%',
                description: 'The saturation part of the design system danger color'
            },
            {
                name: 'color--danger--l',
                value: '59.4117647059%',
                description: 'The lightness part of the design system danger color'
            },
            {
                name: 'color--danger',
                value: 'hsl(var(--color--danger--h), var(--color--danger--s), var(--color--danger--l))',
                modifiers: ['shade'],
                description: 'The computed danger color of the design system'
            },
            {
                name: 'color--success--h',
                value: '154.4186046512deg',
                description: 'The hue part of the design system success color'
            },
            {
                name: 'color--success--s',
                value: '57.8475336323%',
                description: 'The saturation part of the design system success color'
            },
            {
                name: 'color--success--l',
                value: '43.7254901961%',
                description: 'The lightness part of the design system success color'
            },
            {
                name: 'color--success',
                value: 'hsl(var(--color--success--h), var(--color--success--s), var(--color--success--l))',
                modifiers: ['shade'],
                description: 'The computed success color of the design system'
            },
            {
                name: 'color--red--h',
                value: '1.3259668508deg',
                description: 'The hue part of the design system red color'
            },
            {
                name: 'color--red--s',
                value: '87.4396135266%',
                description: 'The saturation part of the design system red color'
            },
            {
                name: 'color--red--l',
                value: '59.4117647059%',
                description: 'The lightness part of the design system red color'
            },
            {
                name: 'color--red',
                value: 'hsl(var(--color--red--h), var(--color--red--s), var(--color--red--l))',
                modifiers: ['shade'],
                description: 'The computed red color of the design system'
            },
            {
                name: 'color--orange--h',
                value: '19.6226415094deg',
                description: 'The hue part of the design system orange color'
            },
            {
                name: 'color--orange--s',
                value: '92.9824561404%',
                description: 'The saturation part of the design system orange color'
            },
            {
                name: 'color--orange--l',
                value: '66.4705882353%',
                description: 'The lightness part of the design system orange color'
            },
            {
                name: 'color--orange',
                value: 'hsl(var(--color--orange--h), var(--color--orange--s), var(--color--orange--l))',
                modifiers: ['shade'],
                description: 'The computed orange color of the design system'
            },
            {
                name: 'color--yellow--h',
                value: '43.6764705882deg',
                description: 'The hue part of the design system yellow color'
            },
            {
                name: 'color--yellow--s',
                value: '100%',
                description: 'The saturation part of the design system yellow color'
            },
            {
                name: 'color--yellow--l',
                value: '73.3333333333%',
                description: 'The lightness part of the design system yellow color'
            },
            {
                name: 'color--yellow',
                value: 'hsl(var(--color--yellow--h), var(--color--yellow--s), var(--color--yellow--l))',
                modifiers: ['shade'],
                description: 'The computed yellow color of the design system'
            },
            {
                name: 'color--green--h',
                value: '154.4186046512deg',
                description: 'The hue part of the design system green color'
            },
            {
                name: 'color--green--s',
                value: '57.8475336323%',
                description: 'The saturation part of the design system green color'
            },
            {
                name: 'color--green--l',
                value: '43.7254901961%',
                description: 'The lightness part of the design system green color'
            },
            {
                name: 'color--green',
                value: 'hsl(var(--color--green--h), var(--color--green--s), var(--color--green--l))',
                modifiers: ['shade'],
                description: 'The computed green color of the design system'
            },
            {
                name: 'color--teal--h',
                value: '173.8888888889deg',
                description: 'The hue part of the design system teal color'
            },
            {
                name: 'color--teal--s',
                value: '42.8571428571%',
                description: 'The saturation part of the design system teal color'
            },
            {
                name: 'color--teal--l',
                value: '49.4117647059%',
                description: 'The lightness part of the design system teal color'
            },
            {
                name: 'color--teal',
                value: 'hsl(var(--color--teal--h), var(--color--teal--s), var(--color--teal--l))',
                modifiers: ['shade'],
                description: 'The computed teal color of the design system'
            },
            {
                name: 'color--blue--h',
                value: '195.0967741935deg',
                description: 'The hue part of the design system blue color'
            },
            {
                name: 'color--blue--s',
                value: '77.1144278607%',
                description: 'The saturation part of the design system blue color'
            },
            {
                name: 'color--blue--l',
                value: '39.4117647059%',
                description: 'The lightness part of the design system blue color'
            },
            {
                name: 'color--blue',
                value: 'hsl(var(--color--blue--h), var(--color--blue--s), var(--color--blue--l))',
                modifiers: ['shade'],
                description: 'The computed blue color of the design system'
            },
            {
                name: 'color--purple--h',
                value: '262.2857142857deg',
                description: 'The hue part of the design system purple color'
            },
            {
                name: 'color--purple--s',
                value: '30.1724137931%',
                description: 'The saturation part of the design system purple color'
            },
            {
                name: 'color--purple--l',
                value: '54.5098039216%',
                description: 'The lightness part of the design system purple color'
            },
            {
                name: 'color--purple',
                value: 'hsl(var(--color--purple--h), var(--color--purple--s), var(--color--purple--l))',
                modifiers: ['shade'],
                description: 'The computed purple color of the design system'
            },
            {
                name: 'color--pink--h',
                value: '351.4285714286deg',
                description: 'The hue part of the design system pink color'
            },
            {
                name: 'color--pink--s',
                value: '95.6834532374%',
                description: 'The saturation part of the design system pink color'
            },
            {
                name: 'color--pink--l',
                value: '72.7450980392%',
                description: 'The lightness part of the design system pink color'
            },
            {
                name: 'color--pink',
                value: 'hsl(var(--color--pink--h), var(--color--pink--s), var(--color--pink--l))',
                modifiers: ['shade'],
                description: 'The computed pink color of the design system'
            },
            {
                name: 'color--transparent--h',
                value: '0deg',
                description: 'The hue part of the design system transparent color'
            },
            {
                name: 'color--transparent--s',
                value: '0%',
                description: 'The saturation part of the design system transparent color'
            },
            {
                name: 'color--transparent--l',
                value: '0%',
                description: 'The lightness part of the design system transparent color'
            },
            {
                name: 'color--transparent',
                value: 'hsl(var(--color--transparent--h), var(--color--transparent--s), var(--color--transparent--l))',
                modifiers: ['shade'],
                description: 'The computed transparent color of the design system'
            },
            {
                name: 'color--white--h',
                value: '0deg',
                description: 'The hue part of the design system white color'
            },
            {
                name: 'color--white--s',
                value: '0%',
                description: 'The saturation part of the design system white color'
            },
            {
                name: 'color--white--l',
                value: '100%',
                description: 'The lightness part of the design system white color'
            },
            {
                name: 'color--white',
                value: 'hsl(var(--color--white--h), var(--color--white--s), var(--color--white--l))',
                modifiers: ['shade'],
                description: 'The computed white color of the design system'
            },
            {
                name: 'color--black--h',
                value: '0deg',
                description: 'The hue part of the design system black color'
            },
            {
                name: 'color--black--s',
                value: '0%',
                description: 'The saturation part of the design system black color'
            },
            {
                name: 'color--black--l',
                value: '0%',
                description: 'The lightness part of the design system black color'
            },
            {
                name: 'color--black',
                value: 'hsl(var(--color--black--h), var(--color--black--s), var(--color--black--l))',
                modifiers: ['shade'],
                description: 'The computed black color of the design system'
            },
            {
                name: 'color--gray--h',
                value: '193.6363636364deg',
                description: 'The hue part of the design system gray color'
            },
            {
                name: 'color--gray--s',
                value: '10.7843137255%',
                description: 'The saturation part of the design system gray color'
            },
            {
                name: 'color--gray--l',
                value: '60%',
                description: 'The lightness part of the design system gray color'
            },
            {
                name: 'color--gray',
                value: 'hsl(var(--color--gray--h), var(--color--gray--s), var(--color--gray--l))',
                modifiers: ['shade'],
                description: 'The computed gray color of the design system'
            },
            {
                name: 'color--light--h',
                value: '193.6363636364deg',
                description: 'The hue part of the design system light color'
            },
            {
                name: 'color--light--s',
                value: '10.7843137255%',
                description: 'The saturation part of the design system light color'
            },
            {
                name: 'color--light--l',
                value: '88%',
                description: 'The lightness part of the design system light color'
            },
            {
                name: 'color--light',
                value: 'hsl(var(--color--light--h), var(--color--light--s), var(--color--light--l))',
                modifiers: ['shade'],
                description: 'The computed light color of the design system'
            },
            {
                name: 'color--dark--h',
                value: '193.6363636364deg',
                description: 'The hue part of the design system dark color'
            },
            {
                name: 'color--dark--s',
                value: '4.3137254902%',
                description: 'The saturation part of the design system dark color'
            },
            {
                name: 'color--dark--l',
                value: '24%',
                description: 'The lightness part of the design system dark color'
            },
            {
                name: 'color--dark',
                value: 'hsl(var(--color--dark--h), var(--color--dark--s), var(--color--dark--l))',
                modifiers: ['shade'],
                description: 'The computed dark color of the design system'
            },
            {
                name: 'color--facebook--h',
                value: '220.6451612903deg',
                description: 'The hue part of the design system facebook color'
            },
            {
                name: 'color--facebook--s',
                value: '44.0758293839%',
                description: 'The saturation part of the design system facebook color'
            },
            {
                name: 'color--facebook--l',
                value: '41.3725490196%',
                description: 'The lightness part of the design system facebook color'
            },
            {
                name: 'color--facebook',
                value: 'hsl(var(--color--facebook--h), var(--color--facebook--s), var(--color--facebook--l))',
                modifiers: ['shade'],
                description: 'The computed facebook color of the design system'
            },
            {
                name: 'color--twitter--h',
                value: '202.8169014085deg',
                description: 'The hue part of the design system twitter color'
            },
            {
                name: 'color--twitter--s',
                value: '89.1213389121%',
                description: 'The saturation part of the design system twitter color'
            },
            {
                name: 'color--twitter--l',
                value: '53.137254902%',
                description: 'The lightness part of the design system twitter color'
            },
            {
                name: 'color--twitter',
                value: 'hsl(var(--color--twitter--h), var(--color--twitter--s), var(--color--twitter--l))',
                modifiers: ['shade'],
                description: 'The computed twitter color of the design system'
            },
            {
                name: 'color--google--h',
                value: '6.5853658537deg',
                description: 'The hue part of the design system google color'
            },
            {
                name: 'color--google--s',
                value: '70.6896551724%',
                description: 'The saturation part of the design system google color'
            },
            {
                name: 'color--google--l',
                value: '54.5098039216%',
                description: 'The lightness part of the design system google color'
            },
            {
                name: 'color--google',
                value: 'hsl(var(--color--google--h), var(--color--google--s), var(--color--google--l))',
                modifiers: ['shade'],
                description: 'The computed google color of the design system'
            },
            {
                name: 'color--github--h',
                value: '0deg',
                description: 'The hue part of the design system github color'
            },
            {
                name: 'color--github--s',
                value: '0%',
                description: 'The saturation part of the design system github color'
            },
            {
                name: 'color--github--l',
                value: '20%',
                description: 'The lightness part of the design system github color'
            },
            {
                name: 'color--github',
                value: 'hsl(var(--color--github--h), var(--color--github--s), var(--color--github--l))',
                modifiers: ['shade'],
                description: 'The computed github color of the design system'
            },
            {
                name: 'color--instagram--h',
                value: '0deg',
                description: 'The hue part of the design system instagram color'
            },
            {
                name: 'color--instagram--s',
                value: '98.2456140351%',
                description: 'The saturation part of the design system instagram color'
            },
            {
                name: 'color--instagram--l',
                value: '55.2941176471%',
                description: 'The lightness part of the design system instagram color'
            },
            {
                name: 'color--instagram',
                value: 'hsl(var(--color--instagram--h), var(--color--instagram--s), var(--color--instagram--l))',
                modifiers: ['shade'],
                description: 'The computed instagram color of the design system'
            },
            {
                name: 'color--dribbble--h',
                value: '336.835443038deg',
                description: 'The hue part of the design system dribbble color'
            },
            {
                name: 'color--dribbble--s',
                value: '79%',
                description: 'The saturation part of the design system dribbble color'
            },
            {
                name: 'color--dribbble--l',
                value: '60.7843137255%',
                description: 'The lightness part of the design system dribbble color'
            },
            {
                name: 'color--dribbble',
                value: 'hsl(var(--color--dribbble--h), var(--color--dribbble--s), var(--color--dribbble--l))',
                modifiers: ['shade'],
                description: 'The computed dribbble color of the design system'
            },
            {
                name: 'color--behance--h',
                value: '218.7931034483deg',
                description: 'The hue part of the design system behance color'
            },
            {
                name: 'color--behance--s',
                value: '100%',
                description: 'The saturation part of the design system behance color'
            },
            {
                name: 'color--behance--l',
                value: '54.5098039216%',
                description: 'The lightness part of the design system behance color'
            },
            {
                name: 'color--behance',
                value: 'hsl(var(--color--behance--h), var(--color--behance--s), var(--color--behance--l))',
                modifiers: ['shade'],
                description: 'The computed behance color of the design system'
            },
            {
                name: 'color--flickr--h',
                value: '328.9411764706deg',
                description: 'The hue part of the design system flickr color'
            },
            {
                name: 'color--flickr--s',
                value: '100%',
                description: 'The saturation part of the design system flickr color'
            },
            {
                name: 'color--flickr--l',
                value: '50%',
                description: 'The lightness part of the design system flickr color'
            },
            {
                name: 'color--flickr',
                value: 'hsl(var(--color--flickr--h), var(--color--flickr--s), var(--color--flickr--l))',
                modifiers: ['shade'],
                description: 'The computed flickr color of the design system'
            },
            {
                name: 'color--linkedin--h',
                value: '200.5524861878deg',
                description: 'The hue part of the design system linkedin color'
            },
            {
                name: 'color--linkedin--s',
                value: '100%',
                description: 'The saturation part of the design system linkedin color'
            },
            {
                name: 'color--linkedin--l',
                value: '35.4901960784%',
                description: 'The lightness part of the design system linkedin color'
            },
            {
                name: 'color--linkedin',
                value: 'hsl(var(--color--linkedin--h), var(--color--linkedin--s), var(--color--linkedin--l))',
                modifiers: ['shade'],
                description: 'The computed linkedin color of the design system'
            },
            {
                name: 'color--youtube--h',
                value: '358.1366459627deg',
                description: 'The hue part of the design system youtube color'
            },
            {
                name: 'color--youtube--s',
                value: '81.7258883249%',
                description: 'The saturation part of the design system youtube color'
            },
            {
                name: 'color--youtube--l',
                value: '38.6274509804%',
                description: 'The lightness part of the design system youtube color'
            },
            {
                name: 'color--youtube',
                value: 'hsl(var(--color--youtube--h), var(--color--youtube--s), var(--color--youtube--l))',
                modifiers: ['shade'],
                description: 'The computed youtube color of the design system'
            },
            {
                name: 'color--pinterest--h',
                value: '353.3701657459deg',
                description: 'The hue part of the design system pinterest color'
            },
            {
                name: 'color--pinterest--s',
                value: '91.8781725888%',
                description: 'The saturation part of the design system pinterest color'
            },
            {
                name: 'color--pinterest--l',
                value: '38.6274509804%',
                description: 'The lightness part of the design system pinterest color'
            },
            {
                name: 'color--pinterest',
                value: 'hsl(var(--color--pinterest--h), var(--color--pinterest--s), var(--color--pinterest--l))',
                modifiers: ['shade'],
                description: 'The computed pinterest color of the design system'
            },
            {
                name: 'color--gitlab--h',
                value: '17.9695431472deg',
                description: 'The hue part of the design system gitlab color'
            },
            {
                name: 'color--gitlab--s',
                value: '95.1690821256%',
                description: 'The saturation part of the design system gitlab color'
            },
            {
                name: 'color--gitlab--l',
                value: '59.4117647059%',
                description: 'The lightness part of the design system gitlab color'
            },
            {
                name: 'color--gitlab',
                value: 'hsl(var(--color--gitlab--h), var(--color--gitlab--s), var(--color--gitlab--l))',
                modifiers: ['shade'],
                description: 'The computed gitlab color of the design system'
            },
            {
                name: 'color--tumblr--h',
                value: '213.8461538462deg',
                description: 'The hue part of the design system tumblr color'
            },
            {
                name: 'color--tumblr--s',
                value: '26.8965517241%',
                description: 'The saturation part of the design system tumblr color'
            },
            {
                name: 'color--tumblr--l',
                value: '28.431372549%',
                description: 'The lightness part of the design system tumblr color'
            },
            {
                name: 'color--tumblr',
                value: 'hsl(var(--color--tumblr--h), var(--color--tumblr--s), var(--color--tumblr--l))',
                modifiers: ['shade'],
                description: 'The computed tumblr color of the design system'
            },
            {
                name: 'color--twitch--h',
                value: '261deg',
                description: 'The hue part of the design system twitch color'
            },
            {
                name: 'color--twitch--s',
                value: '43.4782608696%',
                description: 'The saturation part of the design system twitch color'
            },
            {
                name: 'color--twitch--l',
                value: '45.0980392157%',
                description: 'The lightness part of the design system twitch color'
            },
            {
                name: 'color--twitch',
                value: 'hsl(var(--color--twitch--h), var(--color--twitch--s), var(--color--twitch--l))',
                modifiers: ['shade'],
                description: 'The computed twitch color of the design system'
            },
            {
                name: 'color--envato--h',
                value: '86.3793103448deg',
                description: 'The hue part of the design system envato color'
            },
            {
                name: 'color--envato--s',
                value: '47.1544715447%',
                description: 'The saturation part of the design system envato color'
            },
            {
                name: 'color--envato--l',
                value: '48.2352941176%',
                description: 'The lightness part of the design system envato color'
            },
            {
                name: 'color--envato',
                value: 'hsl(var(--color--envato--h), var(--color--envato--s), var(--color--envato--l))',
                modifiers: ['shade'],
                description: 'The computed envato color of the design system'
            },
            {
                name: 'color--vine--h',
                value: '164.9214659686deg',
                description: 'The hue part of the design system vine color'
            },
            {
                name: 'color--vine--s',
                value: '100%',
                description: 'The saturation part of the design system vine color'
            },
            {
                name: 'color--vine--l',
                value: '37.4509803922%',
                description: 'The lightness part of the design system vine color'
            },
            {
                name: 'color--vine',
                value: 'hsl(var(--color--vine--h), var(--color--vine--s), var(--color--vine--l))',
                modifiers: ['shade'],
                description: 'The computed vine color of the design system'
            },
            {
                name: 'contrast-color-for-light-background',
                value: 'var(--color--gray-90)',
                description: 'The text color used for light backgrounds of the design system'
            },
            {
                name: 'contrast-color-for-dark-background',
                value: 'var(--color--white)',
                description: 'The text color used for dark backgrounds of the design system'
            }
        ]
    }
};

export default manifest;
