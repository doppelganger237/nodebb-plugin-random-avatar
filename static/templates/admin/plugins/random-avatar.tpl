<form role="form" class="random-avatar-settings">





	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">General</div>
		<div class="col-sm-10 col-xs-12">
			<div class="checkbox">
				<label for="override" class="mdl-switch mdl-js-switch mdl-js-ripple-effect">
					<input type="checkbox" class="mdl-switch__input" id="override" name="override" />
					<span class="mdl-switch__label">Force everyone use random avatar(No done yet,To do)</span>
				</label>
			</div>

<!-- 			<div class="checkbox">
				<label for="useCustomAvatar" class="mdl-switch mdl-js-switch mdl-js-ripple-effect">
					<input type="checkbox" class="mdl-switch__input" id="useCustomAvatar" name="useCustomAvatar" />
					<span class="mdl-switch__label">Use custom random avatar</span>
				</label>
			</div>
 -->

			<div class="checkbox">
				<label for="generateOnRefreash" class="mdl-switch mdl-js-switch mdl-js-ripple-effect">
					<input type="checkbox" class="mdl-switch__input" id="generateOnRefreash" name="generateOnRefreash" />
					<span class="mdl-switch__label">Generate a new avatar on refreash page</span>
				</label>
			</div>

			<div class="form-group">
				<label for="customAvatar">Random Avatar URI</label>
				<input placeholder="https://cdn.jsdelivr.net/gh/yunluo/GitCafeApi/avatar/{1,1999}.jpg" type="text" class="form-control" id="customAvatar" name="customAvatar"/>
		 </div>

		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>
