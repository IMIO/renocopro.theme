# -*- coding: utf-8 -*-
from Products.CMFPlone.interfaces import INonInstallable
from Products.CMFPlone.interfaces.controlpanel import IImagingSchema
from collective.behavior.banner.banner import IBanner
from plone import api
from plone.app.imagecropping.behaviors import IImageCroppingBehavior
from plone.dexterity.interfaces import IDexterityFTI
from plone.namedfile.file import NamedBlobImage
from plone.registry.interfaces import IRegistry
from zope.component import queryUtility
from zope.component import queryUtility
from zope.interface import implementer
import os


@implementer(INonInstallable)
class HiddenProfiles(object):

    def getNonInstallableProfiles(self):
        """Hide uninstall profile from site-creation and quickinstaller"""
        return [
            'renocopro.theme:uninstall',
        ]


def post_install(context):
    """Post install script"""
    # Do something at the end of the installation of this package.
    # Add variables less
    lessvars = api.portal.get_registry_record('plone.lessvariables')
    lessvars_new = {
        'color-default': u'rgba(0,123,179,1)',
        'color-light': u'rgba(255,255,255,1)',
        'color-dark': u'rgba(51,51,51,1)',
    }
    lessvars.update(lessvars_new)
    api.portal.set_registry_record('plone.lessvariables', lessvars)
    add_behavior('Folder', IBanner.__identifier__)
    add_behavior('Document', IBanner.__identifier__)
    add_behavior('Folder', IImageCroppingBehavior.__identifier__)
    add_behavior('Document', IImageCroppingBehavior.__identifier__)
    add_format_to_banner(context)


def uninstall(context):
    """Uninstall script"""
    # Do something at the end of the uninstallation of this package.
    #


def add_behavior(type_name, behavior_name):
    """Add a behavior to a type"""
    fti = queryUtility(IDexterityFTI, name=type_name)
    if not fti:
        return
    behaviors = list(fti.behaviors)
    if behavior_name not in behaviors:
        behaviors.append(behavior_name)
        fti._updateProperty('behaviors', tuple(behaviors))


def add_format_to_banner(context):
    registry = queryUtility(IRegistry)
    if not registry:
        return None
    settings = registry.forInterface(IImagingSchema, prefix="plone", check=False)
    if not settings.allowed_sizes:
        return None
    settings.allowed_sizes.append(u'banner 1200:360')
    api.portal.set_registry_record(
        'collective.behavior.banner.browser.controlpanel.IBannerSettingsSchema.banner_scale',
        u'banner'
    )
    api.portal.set_registry_record(
        'collective.behavior.banner.browser.controlpanel.IBannerSettingsSchema.banner_scale',
        u'banner'
    )
    api.portal.set_registry_record(
        'plone.app.imagecropping.browser.settings.ISettings.cropping_for',
        ["banner"]
    )
    api.portal.set_registry_record(
        'plone.app.imagecropping.browser.settings.ISettings.constrain_cropping',
        True
    )
