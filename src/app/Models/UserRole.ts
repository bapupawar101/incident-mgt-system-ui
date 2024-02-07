export enum UserRole {
    Analyst = 0,
    Admin = 1,
    EndUser = 2
}

export function getEnumText(enumValue: number): string {
    const enumText = Object.keys(UserRole).find(key => UserRole[key] === enumValue);
    return enumText || 'Unknown';
}

export function bHideIncidentMenuItems() {
    var loginInfo: any = JSON.parse(localStorage.getItem("loginUserInfo"));
    var hideIncidentMenuItem = false;
    if (loginInfo) {
        for (let i = 0; i < loginInfo.roles.length; i++) {
            var userRole = getEnumText(loginInfo.roles[i]);
            if (userRole == "Analyst" || userRole == "EndUser") {
                hideIncidentMenuItem = true;
            }
        }
    }

    return hideIncidentMenuItem;
}