/**
 * Created by yeming on 4/7/2016.
 */
var MenuRole = require('../dao/menuRoleDAO');
var User = require('../dao/userDAO');

exports.getAllMenus = function (req, res, next) {
    if (!req.session || !req.session.user || !req.session.user.id) {
        return res.redirect('/login');
    }

    var userId = req.session.user.id;

    User.getUserById(userId, function (user) {
        var roleId = user.roleId;

        MenuRole.getMenuByRoleId(roleId, function (menus) {
            var parentMenuMap = {};
            var result = [];
            var menus = JSON.parse(menus);
            menus.forEach(function (menu) {
                //数据库查询出来的menu是按照level从一级到二级
                if (menu.level == 1 && !parentMenuMap.hasOwnProperty(menu.id)) {
                    parentMenuMap[menu.id] = menu;
                    parentMenuMap[menu.id]['children'] = [];
                }
                if (menu.level == 2) {
                    if (parentMenuMap.hasOwnProperty(menu.parentId)) {
                        var parentMenu = parentMenuMap[menu.parentId];
                        parentMenu['children'].push(menu);
                    }
                }
            });

            for (var prop in parentMenuMap) {
                if (parentMenuMap.hasOwnProperty(prop)) {
                    result.push(parentMenuMap[prop]);
                    var children = parentMenuMap[prop]['children'];
                    children.sort(function (menu1, menu2) {
                        return menu1.orderNo - menu2.orderNo;
                    });
                }
            }

            result.sort(function (menu1, menu2) {
                return menu1.orderNo - menu2.orderNo;
            });

            res.json(result);
        });
    });
};
