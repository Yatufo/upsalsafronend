angular.module('eventifyTemplates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("views/components/categories-selector.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <i class=\"fa fa-th-list\"></i> Filters\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"list-group\" ng-repeat=\"parent in root.categories track by parent.id\">\n" +
    "        <li ng-if=\"parent.visible\" class=\"btn-group btn-group-justified\" role=\"group\">\n" +
    "            <a ng-class=\"{selected:child.selected, disabled: child.disabled}\" ng-click=\"changeSelectCategory(parent.id, child.id)\" class=\"btn btn-default\" role=\"button\" ng-repeat=\"child in categories[parent.id].categories track by child.id\">{{child.name}}</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("views/components/comments.html",
    "<div style=\"padding:4px\">\n" +
    "\n" +
    "  <div ng-class=\"current.isEditing ? 'input-group' : '' \" ng-if=\"current.isEditable()\">\n" +
    "    <textarea class=\"form-control\" ng-keydown=\"onKeyDown(current, $event)\" ng-model=\"current.comment\" placeholder=\"What do you think about this place?\" rows=\"{{current.textRows}}\" style=\"resize:none\"></textarea>\n" +
    "    <span class=\"input-group-addon btn btn-primary\" ng-click=\"save(current)\" ng-if=\"current.isEditing\">Post</span>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "  <div class=\"media\" ng-if=\"expanded\" ng-repeat=\"comment in commentable.comments\">\n" +
    "    <div class=\"media-left media-top\">\n" +
    "      <a ng-href=\"{{comment.userInfo.link}}\" target=\"_blank\">\n" +
    "        <img alt=\"\" class=\"avatar\" ng-src=\"{{comment.userInfo.picture}}\"/>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    <div class=\"media-body\">\n" +
    "      <div ng-class=\"comment.isEditing ? 'input-group' : '' \">\n" +
    "        <div class=\"\" ng-if=\"!comment.isEditing\" ng-bind-html=\"comment.formattedComment\"></div>\n" +
    "        <textarea class=\"form-control\" ng-keydown=\"onKeyDown(comment, $event)\" ng-model=\"comment.comment\" ng-if=\"comment.isEditing\" rows=\"{{comment.textRows}}\" style=\"resize:none\"></textarea>\n" +
    "        <span class=\"input-group-addon btn btn-primary\" ng-click=\"save(comment)\" ng-if=\"comment.isEditing\">Save</span>\n" +
    "      </div>\n" +
    "      <small>{{comment.formattedDate}}</small>\n" +
    "      <a href=\"#\" ng-click=\"edit(comment)\" ng-if=\"comment.isEditable() && !comment.isEditing\">edit</a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("views/components/event-card.html",
    "<div class=\"panel panel-danger\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <a href=\"#\" ng-init=\"eventUrl = '/' + city + '/events/' + event.id \" ng-href=\"{{eventUrl}}\">{{event.title}}</a>\n" +
    "        <a href=\"#\" class=\"text-right\" ng-if=\"event.sequence\">#{{event.sequence}}</a>\n" +
    "        <sharesocial data-message=\"'Check this out'\" data-url=\"eventUrl | fullUrl\">\n" +
    "        </sharesocial>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"panel-body\">\n" +
    "        <p><i class=\"fa fa-calendar fa-lg\"> </i> {{event.start.dateTime | date: 'EEEE, MMMM d h:mma' }}</p>\n" +
    "        <p> <i class=\"fa fa-clock-o fa-lg\"></i> {{event.duration}} hours</p>\n" +
    "        <p><i ng-if=\"event.location\" class=\"fa fa-map-marker fa-lg\"></i> <a ng-href=\"/{{city}}/locations/{{event.location.id}}\">{{event.location.name}} - {{event.location.address}}</a>\n" +
    "        </p>\n" +
    "        <p>\n" +
    "            <ul class=\"list-inline\">\n" +
    "                <li class=\"fa fa-list fa-lg\"></li>\n" +
    "                <li ng-repeat=\"category in event.categories track by $index\">{{category}}</li>\n" +
    "            </ul>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
  $templateCache.put("views/components/location-card.html",
    "<div class=\"card shadow\">\n" +
    "  <div class=\"card-image\">\n" +
    "    <uploadimage data-location=\"location\"></uploadimage>\n" +
    "    <span class=\"elipsis card-title\"><a ng-href=\"{{location.detailsUrl}}\">{{location.name}}</a></span>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"card-action clearfix\">\n" +
    "    <div class=\"pull-left\">\n" +
    "      <a class=\"btn btn-icon\" ng-href=\"{{'tel://' + location.phone}}\" ng-if=\"location.phone\">\n" +
    "        <i class=\"fa fa-phone fa-2x\"></i>\n" +
    "      </a>\n" +
    "      <a class=\"btn btn-icon\" ng-href=\"{{location.detailsUrl}}\" ng-if=\"location.address\">\n" +
    "        <i class=\"fa fa-map-marker fa-2x\"></i>\n" +
    "      </a>\n" +
    "      <a class=\"btn btn-icon\" ng-href=\"{{location.url}}\" target=\"window\">\n" +
    "        <i class=\"fa fa-globe fa-2x\"></i>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    <div class=\"pull-right\">\n" +
    "      <simplerate class=\"btn-icon\" data-category=\"'favorite'\" data-rateable=\"location\"></simplerate>\n" +
    "      <a ng-if=\"location.comments.length > 0\" class=\"btn btn-icon\" ng-click=\"toogleComments()\">\n" +
    "        <i class=\"fa fa-comments fa-2x\"> <span class=\"number\">{{location.comments.length}}</span> </i>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <comments data-commentable=\"location\" data-expanded=\"showComments\"></comments>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("views/components/modal-auth.html",
    "<div class=\"modal fade\" id=\"auth-modal\">\n" +
    "  <div class=\"modal-dialog\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <button aria-hidden=\"true\" class=\"close\" data-dismiss=\"modal\" type=\"button\">&times;</button>\n" +
    "        <h4 class=\"modal-title\">Authentication Required</h4>\n" +
    "      </div>\n" +
    "      <div class=\"modal-body text-center\">\n" +
    "        <form ua-login>\n" +
    "          <p>\n" +
    "            <button class=\"btn btn-lg btn-google\" ua-oauth-link=\"google\">\n" +
    "              <i class=\"fa fa-google\"></i>\n" +
    "              Login With Gmail\n" +
    "            </button>\n" +
    "          </p>\n" +
    "          <p>\n" +
    "            <button class=\"btn btn-lg btn-facebook\" ua-oauth-link=\"facebook\">\n" +
    "              <i class=\"fa fa-facebook\"></i>\n" +
    "              Login With Facebook\n" +
    "            </button>\n" +
    "          </p>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "      <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-default\" data-dismiss=\"modal\" type=\"button\">No, thanks</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
  $templateCache.put("views/components/rating.html",
    "<ul class=\"list-inline\">\n" +
    "  <li class=\"list-group-item\" data-ng-repeat=\"rating in displayRatings\">\n" +
    "    <ul class=\"list-inline\">\n" +
    "      <li>\n" +
    "        {{rating.category.name}}\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a href=\"#\" data-ng-click=\"rate(rating, 'up')\">\n" +
    "          <i class=\"fa\" data-ng-class=\"( isRated(rating, 'up') ? 'fa-thumbs-up': 'fa-thumbs-o-up')\">\n" +
    "            {{rating.votes['up']}}\n" +
    "          </i>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a href=\"#\" ng-click=\"rate(rating, 'down')\">\n" +
    "          <i class=\"fa\" data-ng-class=\"( isRated(rating, 'down') ? 'fa-thumbs-down': 'fa-thumbs-o-down')\">\n" +
    "            {{rating.votes['down']}}\n" +
    "          </i>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </li>\n" +
    "  <a href=\"#\" ng-click=\"toogleMore()\">\n" +
    "    <i class=\"fa\" ng-class=\"showAll ? 'fa-minus' : 'fa-plus'\">\n" +
    "      {{showAll ? 'less' : 'more'}}\n" +
    "    </i>\n" +
    "  </a>\n" +
    "</ul>\n" +
    "");
  $templateCache.put("views/components/share-social.html",
    "<ul class=\"list-inline\">\n" +
    "    <li>\n" +
    "        <a href=\"#\" ng-click=\"share('facebook', $event);\">\n" +
    "            <i class=\"fa fa-facebook fa-2x\"></i>\n" +
    "        </a>\n" +
    "    </li>\n" +
    "\n" +
    "    <li>\n" +
    "        <a href=\"#\" ng-click=\"share('twitter', $event);\" target=\"_blank\">\n" +
    "            <i class=\"fa fa-twitter fa-2x\"></i>\n" +
    "        </a>\n" +
    "    </li>\n" +
    "    <li class=\"hidden-md hidden-lg\">\n" +
    "        <a data-ng-href=\"{{urls.whatsapp}}\">\n" +
    "            <i class=\"fa fa-whatsapp fa-2x\"></i>\n" +
    "        </a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
  $templateCache.put("views/components/simplerate.html",
    "<a class=\"btn btn-icon\" data-ng-click=\"rate()\" ng-class=\"{rated : isRated()}\" ng-href=\"#\">\n" +
    "  <i class=\"fa fa-heart fa-2x\">\n" +
    "    <span class=\"number\" ng-if=\"rating.votes['up'] > 0\">\n" +
    "      {{rating.votes['up']}}</span>\n" +
    "  </i>\n" +
    "</a>\n" +
    "");
  $templateCache.put("views/components/theme-footer.html",
    "<div class=\"footer navbar navbar-bottom navbar-inverse text-center\">\n" +
    "    <p>\n" +
    "        <a href=\"mailto:upsalsa@gmail.com\"><i class=\"fa fa-envelope-o fa-lg\"> admin@upsalsa.com</i></a>\n" +
    "        <br/>\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        2015 &copy; All Rights Reserved.\n" +
    "        <a href=\"/privacy\">Privacy Policy</a> | <a href=\"/terms\">Terms of Service</a>\n" +
    "    </p>\n" +
    "</div>\n" +
    "");
  $templateCache.put("views/components/theme-header.html",
    "<nav class=\"navbar navbar-fixed-top navbar-inverse\" role=\"navigation\">\n" +
    "  <div class=\"container\">\n" +
    "    <button class=\"navbar-toggle\" data-target=\"#navbarCollapse\" data-toggle=\"collapse\" type=\"button\">\n" +
    "      <span class=\"sr-only\">Toggle navigation</span>\n" +
    "      <span class=\"icon-bar\"></span>\n" +
    "      <span class=\"icon-bar\"></span>\n" +
    "      <span class=\"icon-bar\"></span>\n" +
    "    </button>\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <a class=\"navbar-brand\" ng-href=\"/{{city}}\">\n" +
    "        <img alt=\"Find the best place to dance\" height=\"60\" id=\"logo-header\" src=\"assets/img/logo1-default.png\">\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    <div class=\"collapse navbar-collapse\" id=\"navbarCollapse\">\n" +
    "      <ul class=\"nav navbar-nav navbar-right\">\n" +
    "        <li>\n" +
    "          <a ng-href=\"/{{city}}/locations\">Places</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a ng-if=\"auth.isAuthenticated\" ng-click=\"logout()\">Log Out</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a ng-if=\"!auth.isAuthenticated\" ng-click=\"signin()\">Log In</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "</nav>\n" +
    "");
  $templateCache.put("views/components/upload-image.html",
    "<div>\n" +
    "  <div class=\"main-image\" ng-show=\"!image\">\n" +
    "    <img ng-src=\"{{location.imageUrl}}\"></img>\n" +
    "    <div accept=\"image/*\" class=\"drop-box\" ng-model=\"image\"\n" +
    "    ngf-drag-over-class=\"'dragover'\" ngf-drop ngf-multiple=\"false\" ngf-pattern=\"'image/*'\"\n" +
    "    ngf-select >\n" +
    "      <a class=\"btn btn-icon\" ng-if=\"isDefaultImage\">\n" +
    "        <i class=\"fa fa-cloud-upload fa-2x\"></i>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"preview\" ng-if=\"image\">\n" +
    "    <img ngf-src=\"image\">\n" +
    "    <div class=\"options\">\n" +
    "      <a class=\"btn btn-icon blue\" ng-click=\"upload()\" ng-show=\"showUpload()\">\n" +
    "        <i class=\"fa fa-cloud-upload fa-2x\"></i>\n" +
    "      </a>\n" +
    "      <a class=\"btn btn-icon blue\" ng-click=\"cancel()\" ng-show=\"showUpload()\">\n" +
    "        <i class=\"fa fa-remove fa-2x\"></i>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "  </img>\n" +
    "  <div class=\"progress\" ng-class=\"status.current\">\n" +
    "    <div aria-valuemax=\"100\" aria-valuemin=\"0\" class=\"progress-bar\" role=\"progressbar\" style=\"width:{{status.progress}}%\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "");
  $templateCache.put("views/events-details.html",
    "<div class=\"container\">\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12 col-md-6\">\n" +
    "            <eventcard data-event=\"event\" data-city=\"city\"> </eventcard>\n" +
    "        </div>\n" +
    "\n" +
    "        <div id=\"map-canvas\" class=\"col-xs-12 col-md-6\">\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
  $templateCache.put("views/events.html",
    "<div class=\"container\">\n" +
    "\n" +
    "    <div class=\"row\" ng-controller=\"CategoriesController\">\n" +
    "        <div class=\"col-xs-12 col-md-5 col-md-push-7 text-center image-selector\">\n" +
    "            <a ng-href=\"#\">\n" +
    "                <img ng-src=\"assets/img/{{selectedEventtype.id}}.jpg\" class=\"img-circle category-circle img-responsive \" alt=\"Selected type:  {{selectedEventtype.name}}\">\n" +
    "                <div class=\"caption\">\n" +
    "                    <h3>{{selectedEventtype.name}}</h3>\n" +
    "                </div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-12 col-md-7 col-md-pull-5\" ng-include=\"'views/components/categories-selector.html'\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "\n" +
    "        <div class=\"col-xs-12 col-md-7 well well-sm\">\n" +
    "            <p ng-if=\"!loading\">Showing {{events.length}} results</p>\n" +
    "            <p ng-if=\"loading\"><i class=\"fa fa-spinner fa-spin fa-2x\"></i>Loading</p>\n" +
    "        </div>\n" +
    "        <div class=\"hidden-xs col-md-5\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12 col-md-7 content\">\n" +
    "            <div ng-repeat=\"event in events | orderBy : event.start.dateTime \">\n" +
    "                <eventcard data-event=\"event\" data-city=\"city\" data-ng-mouseenter=\"highlightLocation(event.location)\"></eventcard>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"hidden-xs col-md-5\">\n" +
    "            <div class=\"fixedColunm\">\n" +
    "                <div id=\"map-canvas\" class=\"hidden-xs col-md-5\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("views/home.html",
    "<div class=\"mainimage\">\n" +
    "    <div>\n" +
    "        <h2><i>FIND A GREAT PLACE TO DANCE IN {{city | uppercase}}!</i></h2>\n" +
    "        <p><i>Look for the best places with the music of your preference now.</i>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"well well-sm text-center\">\n" +
    "</div>\n" +
    "<div class=\"container-fluid image-selector\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"text-center\">\n" +
    "            <a href=\"/{{city}}/locations\">\n" +
    "                <img src=\"assets/img/class.jpg\" class=\"img-circle img-responsive\" alt=\"Places\"\n" +
    "                <div class=\"caption\">\n" +
    "                    <h3>Places</h3>\n" +
    "                </div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
  $templateCache.put("views/locations-details.html",
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12 col-md-5 col-md-offset-1\">\n" +
    "            <locationcard data-location=\"location\" data-city=\"city\"> </locationcard>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-xs-12 col-md-5 google-maps\">\n" +
    "            <iframe frameborder=\"0\" id=\"maps-iframe\" style=\"border:0\"></iframe>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
  $templateCache.put("views/locations.html",
    "<div class=\"left-pane\" ng-show=\"isListVisible\">\n" +
    "  <div class=\"row\">\n" +
    "    <p ng-if=\"loading\">\n" +
    "      <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n" +
    "    </p>\n" +
    "    <div class=\"col-xs-12 col-md-5 col-md-offset-1\">\n" +
    "      <div infinite-scroll-distance=\"3\" infinite-scroll=\"loadMore()\">\n" +
    "        <div ng-repeat=\"location in locations\">\n" +
    "          <locationcard data-city=\"city\" data-location=\"location\" data-ng-mouseenter=\"highlightLocation(location)\"></locationcard>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-6\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div ng-class=\"{'right-pane' : !isMobile, fullscreen : isMobile}\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12 col-md-10\">\n" +
    "      <div class=\"google-maps\" ng-show=\"isMapVisible\">\n" +
    "        <iframe frameborder=\"0\" id=\"maps-iframe\" style=\"border:0\"></iframe>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<div id=\"toogle-map\" ng-click=\"toogleView()\" ng-if=\"canToggleView\">\n" +
    "  <p>\n" +
    "    <i class=\"fa fa-2x\" ng-class=\"isMapVisible ? 'fa-list' : 'fa-map-o' \"></i>\n" +
    "    {{isMapVisible ? 'Show List' : 'Show Map' }}</p>\n" +
    "</div>\n" +
    "");
  $templateCache.put("views/privacy.html",
    "<br>\n" +
    "\n" +
    "<h1> Privacy policy </h1>\n" +
    "\n" +
    "<p>This Privacy Policy governs the manner in which Up Salsa collects, uses, maintains and discloses information collected from users (each, a \"User\") of the <a href=\"http://www.upsalsa.com\">http://www.upsalsa.com</a> website (\"Site\").</p>\n" +
    "\n" +
    "<h3>Personal identification information</h3>\n" +
    "<p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, and in connection with other activities, services, features or resources we make available on our Site.Users may be asked for, as appropriate, name, email address. Users may, however, visit our Site anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.</p>\n" +
    "\n" +
    "<h3>Non-personal identification information</h3>\n" +
    "<p>We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.</p>\n" +
    "\n" +
    "<h3>Web browser cookies</h3>\n" +
    "<p>Our Site may use \"cookies\" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.</p>\n" +
    "\n" +
    "<h3>How we use collected information</h3>\n" +
    "<p>Up Salsa may collect and use Users personal information for the following purposes:</p>\n" +
    "<ul>\n" +
    "  <li>\n" +
    "    <i>To run and operate our Site</i><br/>\n" +
    "    We may need your information display content on the Site correctly.\n" +
    "  </li>\n" +
    "  <li>\n" +
    "    <i>To improve customer service</i><br/>\n" +
    "    Information you provide helps us respond to your customer service requests and support needs more efficiently.\n" +
    "  </li>\n" +
    "  <li>\n" +
    "    <i>To personalize user experience</i><br/>\n" +
    "    We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.\n" +
    "  </li>\n" +
    "  <li>\n" +
    "    <i>To send periodic emails</i><br/>\n" +
    "\n" +
    "  </li>\n" +
    "</ul>\n" +
    "\n" +
    "<h3>How we protect your information</h3>\n" +
    "<p>We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.</p>\n" +
    "\n" +
    "<h3>Sharing your personal information</h3>\n" +
    "<p>We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above. </p>\n" +
    "\n" +
    "<h3>Electronic newsletters</h3>\n" +
    "<p>If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc. If at any time the User would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email or User may contact us via our Site.</p>\n" +
    "\n" +
    "<h3>Third party websites</h3>\n" +
    "<p>Users may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licencors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our Site, is subject to that website's own terms and policies.</p>\n" +
    "\n" +
    "<h3>Changes to this privacy policy</h3>\n" +
    "<p>Up Salsa has the discretion to update this privacy policy at any time. When we do, we will post a notification on the main page of our Site. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.</p>\n" +
    "\n" +
    "<h3>Your acceptance of these terms</h3>\n" +
    "<p>By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes. This policy was created using <a href=\"http://privacypolicies.com\" target=\"_blank\">PrivacyPolicies.com</a></p>\n" +
    "\n" +
    "<h3>Contacting us</h3>\n" +
    "<p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us.</p>\n" +
    "\n" +
    "<p>This document was last updated on August 25, 2015</p>\n" +
    "");
  $templateCache.put("views/terms.html",
    "<br>\n" +
    "\n" +
    "<h1> Terms and conditions </h1>\n" +
    "\n" +
    "<h2>Welcome to Up Salsa!</h2>\n" +
    "<p>These terms and conditions outline the rules and regulations for the use of  Up Salsa's Website. <br />\n" +
    "  <span style=\"text-transform: capitalize;\">Up Salsa</span> is located at:<br />\n" +
    "  <address>\n" +
    "    Montreal, Quebec H3C2C7<br />\n" +
    "    Canada<br />\n" +
    "  </address>\n" +
    "  By accessing this website we assume you accept these terms and conditions in full. Do not continue to use Up Salsa's website if you do not accept all of the terms and conditions stated on this page.\n" +
    "</p>\n" +
    "<p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements: \"Client\", “You” and “Your” refers to you, the person accessing this website and accepting the Company’s terms and conditions. \"The Company\", “Ourselves”, “We”, “Our” and \"Us\", refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services/products, in accordance with and subject to, prevailing law of Canada. Any use of the above terminology or other words in the singular, plural, capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>\n" +
    "\n" +
    "<h2>Cookies</h2>\n" +
    "<p>We employ the use of cookies. By using <a title=\"Up Salsa\" href=\"http://www.upsalsa.com\">Up Salsa</a>'s website you consent to the use of cookies in accordance with Up Salsa’s privacy policy.</p>\n" +
    "<p>Most of the modern day interactive web sites use cookies to enable us to retrieve user details for each visit. Cookies are used in some areas of our site to enable the functionality of this area and ease of use for those people visiting. Some of our affiliate / advertising partners may also use cookies.</p>\n" +
    "\n" +
    "<h2>License</h2>\n" +
    "<p>Unless otherwise stated, Up Salsa and/or it’s licensors own the intellectual property rights for all material on Up Salsa All intellectual property rights are reserved. You may view and/or print pages from http://www.upsalsa.com for your own personal use subject to restrictions set in these terms and conditions.</p>\n" +
    "<p>You must not:</p>\n" +
    "<ul>\n" +
    "  <li>Republish material from http://www.upsalsa.com</li>\n" +
    "  <li>Sell, rent or sub-license material from http://www.upsalsa.com</li>\n" +
    "  <li>Reproduce, duplicate or copy material from http://www.upsalsa.com</li>\n" +
    "</ul>\n" +
    "<p>Redistribute content from Up Salsa (unless content is specifically made for redistribution).</p>\n" +
    "\n" +
    "<h3>User Comments</h3>\n" +
    "<ol>\n" +
    "  <li>This Agreement shall begin on the date hereof.</li>\n" +
    "  <li>Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material and data ('Comments') in areas of the website. Up Salsa does not screen, edit, publish or review Comments prior to their appearance on the website and Comments do not reflect the views or opinions of Up Salsa, its agents or affiliates. Comments reflect the view and opinion of the person who posts such view or opinion. To the extent permitted by applicable laws Up Salsa shall not be responsible or liable for the Comments or for any loss cost, liability, damages or expenses caused and or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</li>\n" +
    "  <li>Up Salsa reserves the right to monitor all Comments and to remove any Comments which it considers in its absolute discretion to be inappropriate, offensive or otherwise in breach of these Terms and Conditions.</li>\n" +
    "  <li>You warrant and represent that:\n" +
    "    <ol>\n" +
    "      <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>\n" +
    "      <li>The Comments do not infringe any intellectual property right, including without limitation copyright, patent or trademark, or other proprietary right of any third party;</li>\n" +
    "      <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material or material which is an invasion of privacy</li>\n" +
    "      <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>\n" +
    "    </ol>\n" +
    "  </li>\n" +
    "  <li>You hereby grant to <strong>Up Salsa</strong> a non-exclusive royalty-free license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</li>\n" +
    "</ol>\n" +
    "\n" +
    "<h2>Hyperlinking to our Content</h2>\n" +
    "<ol>\n" +
    "  <li>The following organizations may link to our Web site without prior written approval:\n" +
    "    <ul>\n" +
    "      <li>Government agencies;</li>\n" +
    "      <li>Search engines;</li>\n" +
    "      <li>News organizations;</li>\n" +
    "      <li>Online directory distributors when they list us in the directory may link to our Web site in the same manner as they hyperlink to the Web sites of other listed businesses; and</li>\n" +
    "      <li>Systemwide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>\n" +
    "    </ul>\n" +
    "  </li>\n" +
    "</ol>\n" +
    "<ol start=\"2\">\n" +
    "  <li>These organizations may link to our home page, to publications or to other Web site information so long as the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.</li>\n" +
    "  <li>We may consider and approve in our sole discretion other link requests from the following types of organizations:\n" +
    "    <ul>\n" +
    "      <li>commonly-known consumer and/or business information sources such as Chambers of Commerce, American Automobile Association, AARP and Consumers Union;</li>\n" +
    "      <li>dot.com community sites;</li>\n" +
    "      <li>associations or other groups representing charities, including charity giving sites,</li>\n" +
    "      <li>online directory distributors;</li>\n" +
    "      <li>internet portals;</li>\n" +
    "      <li>accounting, law and consulting firms whose primary clients are businesses; and</li>\n" +
    "      <li>educational institutions and trade associations.</li>\n" +
    "    </ul>\n" +
    "  </li>\n" +
    "</ol>\n" +
    "\n" +
    "<p>We will approve link requests from these organizations if we determine that: (a) the link would not reflect unfavorably on us or our accredited businesses (for example, trade associations or other organizations representing inherently suspect types of business, such as work-at-home opportunities, shall not be allowed to link); (b)the organization does not have an unsatisfactory record with us; (c) the benefit to us from the visibility associated with the hyperlink outweighs the absence of Up Salsa; and (d) where the link is in the context of general resource information or is otherwise consistent with editorial content in a newsletter or similar product furthering the mission of the organization.</p>\n" +
    "\n" +
    "<p>These organizations may link to our home page, to publications or to other Web site information so long as the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and it products or services; and (c) fits within the context of the linking party's site.</p>\n" +
    "<p>If you are among the organizations listed in paragraph 2 above and are interested in linking to our website, you must notify us by sending an e-mail to <a href=\"mailto:upsalsa@gmail.com\" title=\"send an email to upsalsa@gmail.com\">upsalsa@gmail.com</a>. Please include your name, your organization name, contact information (such as a phone number and/or e-mail address) as well as the URL of your site, a list of any URLs from which you intend to link to our Web site, and a list of the URL(s) on our site to which you would like to link. Allow 2-3 weeks for a response.</p>\n" +
    "\n" +
    "<p>Approved organizations may hyperlink to our Web site as follows:</p>\n" +
    "\n" +
    "<ul>\n" +
    "  <li>By use of our corporate name; or</li>\n" +
    "  <li>By use of the uniform resource locator (Web address) being linked to; or</li>\n" +
    "  <li>By use of any other description of our Web site or material being linked to that makes sense within the context and format of content on the linking party's site.</li>\n" +
    "</ul>\n" +
    "<p>No use of (cname)’s logo or other artwork will be allowed for linking absent a trademark license agreement.</p>\n" +
    "\n" +
    "<h2>Iframes</h2>\n" +
    "<p>Without prior approval and express written permission, you may not create frames around our Web pages or use other techniques that alter in any way the visual presentation or appearance of our Web site.</p>\n" +
    "\n" +
    "<h2>Content Liability</h2>\n" +
    "<p>We shall have no responsibility or liability for any content appearing on your Web site. You agree to indemnify and defend us against all claims arising out of or based upon your Website. No link(s) may appear on any page on your Web site or within any context containing content or materials that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>\n" +
    "\n" +
    "<h2>Reservation of Rights</h2>\n" +
    "<p>We reserve the right at any time and in its sole discretion to request that you remove all links or any particular link to our Web site. You agree to immediately remove all links to our Web site upon such request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuing to link to our Web site, you agree to be bound to and abide by these linking terms and conditions.</p>\n" +
    "\n" +
    "<h2>Removal of links from our website</h2>\n" +
    "<p>If you find any link on our Web site or any linked web site objectionable for any reason, you may contact us about this. We will consider requests to remove links but will have no obligation to do so or to respond directly to you.</p>\n" +
    "<p>Whilst we endeavour to ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we commit to ensuring that the website remains available or that the material on the website is kept up to date.</p>\n" +
    "\n" +
    "<h2>Disclaimer</h2>\n" +
    "<p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose and/or the use of reasonable care and skill). Nothing in this disclaimer will:</p>\n" +
    "\n" +
    "<ol>\n" +
    "  <li>limit or exclude our or your liability for death or personal injury resulting from negligence;</li>\n" +
    "  <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>\n" +
    "  <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>\n" +
    "  <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>\n" +
    "</ol>\n" +
    "<p>The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer or in relation to the subject matter of this disclaimer, including liabilities arising in contract, in tort (including negligence) and for breach of statutory duty.</p>\n" +
    "<p>To the extent that the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>\n" +
    "\n" +
    "<h2>Credit</h2>\n" +
    "<p>This Terms and conditions page was created at <a href=\"http://termsandconditionstemplate.com\">termsandconditionstemplate.com</a></p>\n" +
    "");
}]);
