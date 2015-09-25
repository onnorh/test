window.videaShared.service('gridSortUtilityService', [
    function() {

        function dateSort(property, isDescending) {
            return function(a, b) {
                var dateA = new Date(a[property]);
                var dateB = new Date(b[property]);
                return genericSort(dateA, dateB, isDescending);
            };
        }

        function timeSort(property, isDescending) {
            return function(a, b) {
                var dateA = new Date(a[property]);
                var dateB = new Date(b[property]);

                var sortingA = new Date(1981, 2, 26, dateA.getUTCHours(), dateA.getUTCMinutes());
                var sortingB = new Date(1981, 2, 26, dateB.getUTCHours(), dateB.getUTCMinutes());
                return genericSort(sortingA, sortingB, isDescending);
            };
        }

        function genericSort(sortingA, sortingB, isDescending) {
            if (isDescending) {
                return (sortingA > sortingB) ? -1 : (sortingA < sortingB) ? 1 : 0;
            } else {
                return (sortingA < sortingB) ? -1 : (sortingA > sortingB) ? 1 : 0;
            }
        }

        return {
            dateSort: dateSort,
            timeSort: timeSort
        }
    }
]);