"use strict";

const url = require('url');

function getDatabaseOptionsFromURI(uri) {
  const databaseOptions = {};
  const parsedURI = url.parse(uri);
  const queryParams = parseQueryParams(parsedURI.query);
  const authParts = parsedURI.auth ? parsedURI.auth.split(':') : [];
  databaseOptions.host = parsedURI.hostname || 'localhost';
  databaseOptions.port = parsedURI.port ? parseInt(parsedURI.port) : 5432;
  databaseOptions.database = parsedURI.pathname ? parsedURI.pathname.substr(1) : undefined;
  databaseOptions.user = authParts.length > 0 ? authParts[0] : '';
  databaseOptions.password = authParts.length > 1 ? authParts[1] : '';
  databaseOptions.ssl = queryParams.ssl && queryParams.ssl.toLowerCase() === 'true' ? true : false;
  databaseOptions.binary = queryParams.binary && queryParams.binary.toLowerCase() === 'true' ? true : false;
  databaseOptions.client_encoding = queryParams.client_encoding;
  databaseOptions.application_name = queryParams.application_name;
  databaseOptions.fallback_application_name = queryParams.fallback_application_name;

  if (queryParams.poolSize) {
    databaseOptions.poolSize = parseInt(queryParams.poolSize) || 10;
  }

  return databaseOptions;
}

function parseQueryParams(queryString) {
  queryString = queryString || '';
  return queryString.split('&').reduce((p, c) => {
    const parts = c.split('=');
    p[decodeURIComponent(parts[0])] = parts.length > 1 ? decodeURIComponent(parts.slice(1).join('=')) : '';
    return p;
  }, {});
}

module.exports = {
  parseQueryParams: parseQueryParams,
  getDatabaseOptionsFromURI: getDatabaseOptionsFromURI
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9BZGFwdGVycy9TdG9yYWdlL1Bvc3RncmVzL1Bvc3RncmVzQ29uZmlnUGFyc2VyLmpzIl0sIm5hbWVzIjpbInVybCIsInJlcXVpcmUiLCJnZXREYXRhYmFzZU9wdGlvbnNGcm9tVVJJIiwidXJpIiwiZGF0YWJhc2VPcHRpb25zIiwicGFyc2VkVVJJIiwicGFyc2UiLCJxdWVyeVBhcmFtcyIsInBhcnNlUXVlcnlQYXJhbXMiLCJxdWVyeSIsImF1dGhQYXJ0cyIsImF1dGgiLCJzcGxpdCIsImhvc3QiLCJob3N0bmFtZSIsInBvcnQiLCJwYXJzZUludCIsImRhdGFiYXNlIiwicGF0aG5hbWUiLCJzdWJzdHIiLCJ1bmRlZmluZWQiLCJ1c2VyIiwibGVuZ3RoIiwicGFzc3dvcmQiLCJzc2wiLCJ0b0xvd2VyQ2FzZSIsImJpbmFyeSIsImNsaWVudF9lbmNvZGluZyIsImFwcGxpY2F0aW9uX25hbWUiLCJmYWxsYmFja19hcHBsaWNhdGlvbl9uYW1lIiwicG9vbFNpemUiLCJxdWVyeVN0cmluZyIsInJlZHVjZSIsInAiLCJjIiwicGFydHMiLCJkZWNvZGVVUklDb21wb25lbnQiLCJzbGljZSIsImpvaW4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU1BLEdBQUcsR0FBR0MsT0FBTyxDQUFDLEtBQUQsQ0FBbkI7O0FBRUEsU0FBU0MseUJBQVQsQ0FBbUNDLEdBQW5DLEVBQXdDO0FBQ3RDLFFBQU1DLGVBQWUsR0FBRyxFQUF4QjtBQUVBLFFBQU1DLFNBQVMsR0FBR0wsR0FBRyxDQUFDTSxLQUFKLENBQVVILEdBQVYsQ0FBbEI7QUFDQSxRQUFNSSxXQUFXLEdBQUdDLGdCQUFnQixDQUFDSCxTQUFTLENBQUNJLEtBQVgsQ0FBcEM7QUFDQSxRQUFNQyxTQUFTLEdBQUdMLFNBQVMsQ0FBQ00sSUFBVixHQUFpQk4sU0FBUyxDQUFDTSxJQUFWLENBQWVDLEtBQWYsQ0FBcUIsR0FBckIsQ0FBakIsR0FBNkMsRUFBL0Q7QUFFQVIsRUFBQUEsZUFBZSxDQUFDUyxJQUFoQixHQUF1QlIsU0FBUyxDQUFDUyxRQUFWLElBQXNCLFdBQTdDO0FBQ0FWLEVBQUFBLGVBQWUsQ0FBQ1csSUFBaEIsR0FBdUJWLFNBQVMsQ0FBQ1UsSUFBVixHQUFpQkMsUUFBUSxDQUFDWCxTQUFTLENBQUNVLElBQVgsQ0FBekIsR0FBNEMsSUFBbkU7QUFDQVgsRUFBQUEsZUFBZSxDQUFDYSxRQUFoQixHQUEyQlosU0FBUyxDQUFDYSxRQUFWLEdBQ3ZCYixTQUFTLENBQUNhLFFBQVYsQ0FBbUJDLE1BQW5CLENBQTBCLENBQTFCLENBRHVCLEdBRXZCQyxTQUZKO0FBSUFoQixFQUFBQSxlQUFlLENBQUNpQixJQUFoQixHQUF1QlgsU0FBUyxDQUFDWSxNQUFWLEdBQW1CLENBQW5CLEdBQXVCWixTQUFTLENBQUMsQ0FBRCxDQUFoQyxHQUFzQyxFQUE3RDtBQUNBTixFQUFBQSxlQUFlLENBQUNtQixRQUFoQixHQUEyQmIsU0FBUyxDQUFDWSxNQUFWLEdBQW1CLENBQW5CLEdBQXVCWixTQUFTLENBQUMsQ0FBRCxDQUFoQyxHQUFzQyxFQUFqRTtBQUVBTixFQUFBQSxlQUFlLENBQUNvQixHQUFoQixHQUNFakIsV0FBVyxDQUFDaUIsR0FBWixJQUFtQmpCLFdBQVcsQ0FBQ2lCLEdBQVosQ0FBZ0JDLFdBQWhCLE9BQWtDLE1BQXJELEdBQThELElBQTlELEdBQXFFLEtBRHZFO0FBRUFyQixFQUFBQSxlQUFlLENBQUNzQixNQUFoQixHQUNFbkIsV0FBVyxDQUFDbUIsTUFBWixJQUFzQm5CLFdBQVcsQ0FBQ21CLE1BQVosQ0FBbUJELFdBQW5CLE9BQXFDLE1BQTNELEdBQ0ksSUFESixHQUVJLEtBSE47QUFLQXJCLEVBQUFBLGVBQWUsQ0FBQ3VCLGVBQWhCLEdBQWtDcEIsV0FBVyxDQUFDb0IsZUFBOUM7QUFDQXZCLEVBQUFBLGVBQWUsQ0FBQ3dCLGdCQUFoQixHQUFtQ3JCLFdBQVcsQ0FBQ3FCLGdCQUEvQztBQUNBeEIsRUFBQUEsZUFBZSxDQUFDeUIseUJBQWhCLEdBQ0V0QixXQUFXLENBQUNzQix5QkFEZDs7QUFHQSxNQUFJdEIsV0FBVyxDQUFDdUIsUUFBaEIsRUFBMEI7QUFDeEIxQixJQUFBQSxlQUFlLENBQUMwQixRQUFoQixHQUEyQmQsUUFBUSxDQUFDVCxXQUFXLENBQUN1QixRQUFiLENBQVIsSUFBa0MsRUFBN0Q7QUFDRDs7QUFFRCxTQUFPMUIsZUFBUDtBQUNEOztBQUVELFNBQVNJLGdCQUFULENBQTBCdUIsV0FBMUIsRUFBdUM7QUFDckNBLEVBQUFBLFdBQVcsR0FBR0EsV0FBVyxJQUFJLEVBQTdCO0FBRUEsU0FBT0EsV0FBVyxDQUFDbkIsS0FBWixDQUFrQixHQUFsQixFQUF1Qm9CLE1BQXZCLENBQThCLENBQUNDLENBQUQsRUFBSUMsQ0FBSixLQUFVO0FBQzdDLFVBQU1DLEtBQUssR0FBR0QsQ0FBQyxDQUFDdEIsS0FBRixDQUFRLEdBQVIsQ0FBZDtBQUNBcUIsSUFBQUEsQ0FBQyxDQUFDRyxrQkFBa0IsQ0FBQ0QsS0FBSyxDQUFDLENBQUQsQ0FBTixDQUFuQixDQUFELEdBQ0VBLEtBQUssQ0FBQ2IsTUFBTixHQUFlLENBQWYsR0FBbUJjLGtCQUFrQixDQUFDRCxLQUFLLENBQUNFLEtBQU4sQ0FBWSxDQUFaLEVBQWVDLElBQWYsQ0FBb0IsR0FBcEIsQ0FBRCxDQUFyQyxHQUFrRSxFQURwRTtBQUVBLFdBQU9MLENBQVA7QUFDRCxHQUxNLEVBS0osRUFMSSxDQUFQO0FBTUQ7O0FBRURNLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNmaEMsRUFBQUEsZ0JBQWdCLEVBQUVBLGdCQURIO0FBRWZOLEVBQUFBLHlCQUF5QixFQUFFQTtBQUZaLENBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdXJsID0gcmVxdWlyZSgndXJsJyk7XG5cbmZ1bmN0aW9uIGdldERhdGFiYXNlT3B0aW9uc0Zyb21VUkkodXJpKSB7XG4gIGNvbnN0IGRhdGFiYXNlT3B0aW9ucyA9IHt9O1xuXG4gIGNvbnN0IHBhcnNlZFVSSSA9IHVybC5wYXJzZSh1cmkpO1xuICBjb25zdCBxdWVyeVBhcmFtcyA9IHBhcnNlUXVlcnlQYXJhbXMocGFyc2VkVVJJLnF1ZXJ5KTtcbiAgY29uc3QgYXV0aFBhcnRzID0gcGFyc2VkVVJJLmF1dGggPyBwYXJzZWRVUkkuYXV0aC5zcGxpdCgnOicpIDogW107XG5cbiAgZGF0YWJhc2VPcHRpb25zLmhvc3QgPSBwYXJzZWRVUkkuaG9zdG5hbWUgfHwgJ2xvY2FsaG9zdCc7XG4gIGRhdGFiYXNlT3B0aW9ucy5wb3J0ID0gcGFyc2VkVVJJLnBvcnQgPyBwYXJzZUludChwYXJzZWRVUkkucG9ydCkgOiA1NDMyO1xuICBkYXRhYmFzZU9wdGlvbnMuZGF0YWJhc2UgPSBwYXJzZWRVUkkucGF0aG5hbWVcbiAgICA/IHBhcnNlZFVSSS5wYXRobmFtZS5zdWJzdHIoMSlcbiAgICA6IHVuZGVmaW5lZDtcblxuICBkYXRhYmFzZU9wdGlvbnMudXNlciA9IGF1dGhQYXJ0cy5sZW5ndGggPiAwID8gYXV0aFBhcnRzWzBdIDogJyc7XG4gIGRhdGFiYXNlT3B0aW9ucy5wYXNzd29yZCA9IGF1dGhQYXJ0cy5sZW5ndGggPiAxID8gYXV0aFBhcnRzWzFdIDogJyc7XG5cbiAgZGF0YWJhc2VPcHRpb25zLnNzbCA9XG4gICAgcXVlcnlQYXJhbXMuc3NsICYmIHF1ZXJ5UGFyYW1zLnNzbC50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7XG4gIGRhdGFiYXNlT3B0aW9ucy5iaW5hcnkgPVxuICAgIHF1ZXJ5UGFyYW1zLmJpbmFyeSAmJiBxdWVyeVBhcmFtcy5iaW5hcnkudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnXG4gICAgICA/IHRydWVcbiAgICAgIDogZmFsc2U7XG5cbiAgZGF0YWJhc2VPcHRpb25zLmNsaWVudF9lbmNvZGluZyA9IHF1ZXJ5UGFyYW1zLmNsaWVudF9lbmNvZGluZztcbiAgZGF0YWJhc2VPcHRpb25zLmFwcGxpY2F0aW9uX25hbWUgPSBxdWVyeVBhcmFtcy5hcHBsaWNhdGlvbl9uYW1lO1xuICBkYXRhYmFzZU9wdGlvbnMuZmFsbGJhY2tfYXBwbGljYXRpb25fbmFtZSA9XG4gICAgcXVlcnlQYXJhbXMuZmFsbGJhY2tfYXBwbGljYXRpb25fbmFtZTtcblxuICBpZiAocXVlcnlQYXJhbXMucG9vbFNpemUpIHtcbiAgICBkYXRhYmFzZU9wdGlvbnMucG9vbFNpemUgPSBwYXJzZUludChxdWVyeVBhcmFtcy5wb29sU2l6ZSkgfHwgMTA7XG4gIH1cblxuICByZXR1cm4gZGF0YWJhc2VPcHRpb25zO1xufVxuXG5mdW5jdGlvbiBwYXJzZVF1ZXJ5UGFyYW1zKHF1ZXJ5U3RyaW5nKSB7XG4gIHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmcgfHwgJyc7XG5cbiAgcmV0dXJuIHF1ZXJ5U3RyaW5nLnNwbGl0KCcmJykucmVkdWNlKChwLCBjKSA9PiB7XG4gICAgY29uc3QgcGFydHMgPSBjLnNwbGl0KCc9Jyk7XG4gICAgcFtkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pXSA9XG4gICAgICBwYXJ0cy5sZW5ndGggPiAxID8gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzLnNsaWNlKDEpLmpvaW4oJz0nKSkgOiAnJztcbiAgICByZXR1cm4gcDtcbiAgfSwge30pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VRdWVyeVBhcmFtczogcGFyc2VRdWVyeVBhcmFtcyxcbiAgZ2V0RGF0YWJhc2VPcHRpb25zRnJvbVVSSTogZ2V0RGF0YWJhc2VPcHRpb25zRnJvbVVSSSxcbn07XG4iXX0=