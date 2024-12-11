@echo off

cls

d:

cd /d d:\gcs\spirent-fno-customizations-2024

xcopy /e /y /r /q out\production\spirent-customizations custom\WEB-INF\classes\.

dir /b /s custom


