var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Date utilities
export var formatDate = function (date) {
    var d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};
export var formatDateTime = function (date) {
    var d = new Date(date);
    return d.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
export var getRelativeTime = function (date) {
    var now = new Date();
    var d = new Date(date);
    var diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diffInSeconds < 60)
        return 'just now';
    if (diffInSeconds < 3600)
        return "".concat(Math.floor(diffInSeconds / 60), " minutes ago");
    if (diffInSeconds < 86400)
        return "".concat(Math.floor(diffInSeconds / 3600), " hours ago");
    if (diffInSeconds < 2592000)
        return "".concat(Math.floor(diffInSeconds / 86400), " days ago");
    return formatDate(d);
};
// String utilities
export var capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
export var truncate = function (str, length) {
    if (str.length <= length)
        return str;
    return str.slice(0, length) + '...';
};
// Number utilities
export var formatNumber = function (num) {
    return new Intl.NumberFormat('en-US').format(num);
};
export var formatPercentage = function (num, decimals) {
    if (decimals === void 0) { decimals = 1; }
    return "".concat(num.toFixed(decimals), "%");
};
export var calculatePercentage = function (value, total) {
    if (total === 0)
        return 0;
    return (value / total) * 100;
};
// Validation utilities
export var isValidEmail = function (email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
export var isValidPassword = function (password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
// Array utilities
export var groupBy = function (array, key) {
    return array.reduce(function (groups, item) {
        var group = String(item[key]);
        groups[group] = groups[group] || [];
        groups[group].push(item);
        return groups;
    }, {});
};
export var sortBy = function (array, key, direction) {
    if (direction === void 0) { direction = 'asc'; }
    return __spreadArray([], array, true).sort(function (a, b) {
        var aVal = a[key];
        var bVal = b[key];
        if (aVal < bVal)
            return direction === 'asc' ? -1 : 1;
        if (aVal > bVal)
            return direction === 'asc' ? 1 : -1;
        return 0;
    });
};
// Local storage utilities
export var getFromStorage = function (key, defaultValue) {
    if (typeof window === 'undefined')
        return defaultValue;
    try {
        var item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    }
    catch (_a) {
        return defaultValue;
    }
};
export var setToStorage = function (key, value) {
    if (typeof window === 'undefined')
        return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch (_a) {
        // Silently fail if localStorage is not available
    }
};
export var removeFromStorage = function (key) {
    if (typeof window === 'undefined')
        return;
    try {
        localStorage.removeItem(key);
    }
    catch (_a) {
        // Silently fail if localStorage is not available
    }
};
