<?php snippet('header') ?>

<div id="bg-obj" class="bg-obj" data-src="<?= url('assets/images/blurred_image.jpg') ?>"></div>
<div class="container-wrapper">
  <div class="left-content montserrat f4">
    <div id="side-navigation" class="side-navigation">
      <ul id="menu-scroll-leistungen" class="menu">
        <?php foreach ($page->sections()->toStructure() as $section): ?>
        <li class="clickable menu-item">
          <a href="#<?= esc($section->slug()) ?>" rel="<?= esc($section->slug()) ?>" title="<?= esc($section->title()) ?>">
            <?= esc($section->title()) ?>
          </a>
        </li>
        <?php endforeach ?>
      </ul>
    </div>
  </div>
  <main class="montserrat container">
    <?php if ($page->hero_title()->isNotEmpty()): ?>
      <h1 class="wp-block-heading"><?= esc($page->hero_title()) ?></h1>
    <?php endif ?>
    <?php foreach ($page->sections()->toStructure() as $section): ?>
      <h2 class="wp-block-heading" id="<?= esc($section->slug()) ?>">
        <?= esc($section->title()) ?>
      </h2>
      <div>
        <?= $section->body()->kirbytext() ?>
      </div>
    <?php endforeach ?>
    <div class="clear-div"></div>
  </main>
</div>

<?php snippet('footer') ?>
