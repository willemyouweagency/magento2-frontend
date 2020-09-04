/**
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is provided with Magento in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 *
 * Copyright © 2020 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 */

/*browser:true*/
/*global define*/
define(
    [
        'jquery',
        'Magento_Checkout/js/view/payment/default',
        'Magento_Checkout/js/action/redirect-on-success',
        'mage/url'
    ],

    /**
     *
     * @param $
     * @param Component
     * @param redirectOnSuccessAction
     * @param url
     * @returns {*}
     */
    function (
        $,
        Component,
        redirectOnSuccessAction,
        url
    ) {
        const config = window.checkoutConfig.payment.multisafepay_directdebit;
        'use strict';

        let self;

        return Component.extend({
            defaults: {
                template: 'MultiSafepay_ConnectFrontend/payment/gateway/directdebit',
                accountHolderName: '',
                accountHolderIban: '',
                emandate: '',
                transactionResult: ''
            },

            initialize: function () {
                this._super()
                    .observe('accountHolderName')
                    .observe('accountHolderIban')
                    .observe('emandate');
                self = this;
            },

            /**
             * Get the gateway code
             *
             * @returns {string}
             */
            getCode: function () {
                return 'multisafepay_directdebit';
            },

            /**
             * Get the gateway image
             *
             * @returns {string}
             */
            getImage: function () {
                return config.image;
            },

            /**
             * Add payment method specific data to additional data
             *
             * @returns {{additional_data: {account_holder_iban: *, emandate: *, account_holder_name: *}, method: *}}
             */
            getData: function () {
                return {
                    "method": this.item.method,
                    "additional_data": {
                        'account_holder_name': this.accountHolderName(),
                        'account_holder_iban': this.accountHolderIban(),
                        'emandate': this.emandate(),
                    }
                };
            },

            /**
             * Redirect to controller after place order
             */
            afterPlaceOrder: function () {
                redirectOnSuccessAction.redirectUrl = url.build('multisafepay/connect/redirect/');
                this.redirectAfterPlaceOrder = true;
            }
        });
    }
);