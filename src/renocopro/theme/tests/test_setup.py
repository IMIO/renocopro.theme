# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from renocopro.theme.testing import RENOCOPRO_THEME_INTEGRATION_TESTING

import unittest


class TestSetup(unittest.TestCase):
    """Test that renocopro.theme is properly installed."""

    layer = RENOCOPRO_THEME_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')

    def test_product_installed(self):
        """Test if renocopro.theme is installed."""
        self.assertTrue(self.installer.isProductInstalled(
            'renocopro.theme'))

    def test_browserlayer(self):
        """Test that IRenocoproThemeLayer is registered."""
        from renocopro.theme.interfaces import (
            IRenocoproThemeLayer)
        from plone.browserlayer import utils
        self.assertIn(IRenocoproThemeLayer, utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = RENOCOPRO_THEME_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')
        roles_before = api.user.get_roles(username=TEST_USER_ID)
        setRoles(self.portal, TEST_USER_ID, ['Manager'])
        self.installer.uninstallProducts(['renocopro.theme'])
        setRoles(self.portal, TEST_USER_ID, roles_before)

    def test_product_uninstalled(self):
        """Test if renocopro.theme is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled(
            'renocopro.theme'))

    def test_browserlayer_removed(self):
        """Test that IRenocoproThemeLayer is removed."""
        from renocopro.theme.interfaces import \
            IRenocoproThemeLayer
        from plone.browserlayer import utils
        self.assertNotIn(
            IRenocoproThemeLayer,
            utils.registered_layers(),
        )
