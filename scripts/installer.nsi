; HM NIS Edit Wizard helper defines
!include "MUI2.nsh"

; ; MUI Settings
!define MUI_ABORTWARNING

; 欢迎页面
!insertmacro MUI_PAGE_WELCOME

ShowInstDetails show
ShowUnInstDetails show
SpaceTexts show

; 安装脚本
!macro customInstall

!macroend
